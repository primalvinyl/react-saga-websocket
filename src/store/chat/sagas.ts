import { ChatMessageType, ChatMessageActionType } from './types';
import { take, put, call, delay, takeEvery, ActionPattern } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { createAction } from '@reduxjs/toolkit';
import { putChatMessage } from './reducers';
import serviceWebSocket from '../serviceWebSocket';

// chat message channel
export function chatListener() {
    return eventChannel((emitter) => {
        serviceWebSocket.onmessage = ({ data }) => emitter(data);
        serviceWebSocket.onclose = () => emitter(END);
        serviceWebSocket.onerror = () => emitter(END);
        return () => serviceWebSocket.close();
    });
}

// get chat message
export function* getChatMessageSaga(): Generator {
    try {
        // start channel
        const socket = yield call(chatListener);

        // subscribe to channel
        while (true) {
            const payload = yield take(socket as ActionPattern);
            console.log(payload);
            yield put(putChatMessage({
                list: [JSON.parse(payload as string)],
                status: 'connected'
            }));
        }
    } finally {
        // channel diconnected
        yield put(putChatMessage({
            list: [{ user: 'Client', text: 'Disconnected from server.' }],
            status: 'disconnected'
        }));
    }
}

// send chat message
export const sendChatMessage = createAction<ChatMessageType>('chat/sendChatMessage');

export function* sendChatMessageWorker({ payload }: ChatMessageActionType): Generator {
    try {
        yield put(putChatMessage({ list: [payload] }));
        yield call([serviceWebSocket, 'send'], JSON.stringify(payload));
    } catch (error) {
        yield put(putChatMessage({ list: [{ user: 'Client', text: 'Error sending last message.' }] }));
    }
}

export function* sendChatMessageWatcher() {
    yield takeEvery(sendChatMessage.toString(), sendChatMessageWorker);
}
