import { take, put, call, fork, ActionPattern } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { createAction } from '@reduxjs/toolkit';
import { putMessage } from './reducers';
import { MessageType } from './types';

export function webSocketListener(serviceWebSocket: WebSocket) {
    return eventChannel((emitter) => {
        serviceWebSocket.onmessage = ({ data }: MessageEvent) => emitter(data);
        serviceWebSocket.onclose = () => emitter(END);
        serviceWebSocket.onerror = () => emitter(END);
        return () => serviceWebSocket.close();
    });
}

export function* webSocketSaga(): Generator {
    try {
        // start websocket and channel
        const serviceWebSocket = new WebSocket('ws://localhost:8080/chat');
        const socket = yield call(webSocketListener, serviceWebSocket);

        yield put(putMessage({ status: 'connected' }));
        yield fork(sendMessageSaga, serviceWebSocket);

        // subscribe to channel
        while (true) {
            const payload = yield take(socket as ActionPattern);
            yield put(putMessage({ list: [JSON.parse(payload as string)] }));
        }

    } finally {
        // channel diconnected
        yield put(putMessage({
            list: [{ user: 'Client', text: 'Disconnected from server.' }],
            status: 'disconnected'
        }));
    }
}

export const sendMessage = createAction<MessageType>('chat/sendMessage');
export function* sendMessageSaga(serviceWebSocket: WebSocket) {
    while (true) {
        const { payload } = yield take(sendMessage.toString());
        try {
            yield put(putMessage({ list: [payload] }));
            yield call([serviceWebSocket, 'send'], JSON.stringify(payload));
        } catch (error) {
            yield put(putMessage({
                list: [{ user: 'Client', text: 'Error sending last message.' }]
            }));
        }
    }
}
