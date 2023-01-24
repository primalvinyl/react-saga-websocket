import { take, put, call, delay, takeEvery, ActionPattern } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { createAction } from '@reduxjs/toolkit';
import { putChatMessage } from './reducers';
import { ChatMessageType, ChatMessageActionType } from './types';

let serviceWebSocket: WebSocket;

// chat message channel
export function chatListener() {
    return eventChannel((emitter) => {
        serviceWebSocket.onmessage = ({ data }: MessageEvent) => emitter(data);
        serviceWebSocket.onclose = () => emitter(END);
        serviceWebSocket.onerror = () => emitter(END);
        return () => serviceWebSocket.close();
    });
}

// start websocket and get chat messages
export function* getChatMessageSaga(): Generator {
    try {
        // start websocket
        serviceWebSocket = new WebSocket('ws://localhost:8080/chat');

        // start channel
        const socket = yield call(chatListener);

        // subscribe to channel
        while (true) {
            const payload = yield take(socket as ActionPattern);
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

        // try to establish a new connection
        yield delay(4000);
        return yield call(getChatMessageSaga);
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
