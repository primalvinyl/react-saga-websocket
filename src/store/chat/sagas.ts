import { take, put, call, delay, takeEvery, ActionPattern } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { createAction } from '@reduxjs/toolkit';
import { putMessage } from './reducers';
import { MessageType, MessageActionType } from './types';

let serviceWebSocket: WebSocket;

// websocket channel
export function webSocketListener() {
    return eventChannel((emitter) => {
        serviceWebSocket.onmessage = ({ data }: MessageEvent) => emitter(data);
        serviceWebSocket.onclose = () => emitter(END);
        serviceWebSocket.onerror = () => emitter(END);
        return () => serviceWebSocket.close();
    });
}

// start and subscribe to websocket channel
export function* webSocketSaga(): Generator {
    try {
        // start websocket
        serviceWebSocket = new WebSocket('ws://localhost:8080/chat');

        // start channel
        const socket = yield call(webSocketListener);

        // subscribe to channel
        while (true) {
            const payload = yield take(socket as ActionPattern);
            yield put(putMessage({
                list: [JSON.parse(payload as string)],
                status: 'connected'
            }));
        }
    } finally {
        // channel diconnected
        yield put(putMessage({
            list: [{ user: 'Client', text: 'Disconnected from server.' }],
            status: 'disconnected'
        }));

        // try to establish a new connection
        yield delay(4000);
        return yield call(webSocketSaga);
    }
}

// send websocket message
export const sendMessage = createAction<MessageType>('chat/sendMessage');

export function* sendMessageWorker({ payload }: MessageActionType): Generator {
    try {
        yield put(putMessage({ list: [payload] }));
        yield call([serviceWebSocket, 'send'], JSON.stringify(payload));
    } catch (error) {
        yield put(putMessage({
            list: [{ user: 'Client', text: 'Error sending last message.' }]
        }));
    }
}

export function* sendMessageWatcher() {
    yield takeEvery(sendMessage.toString(), sendMessageWorker);
}
