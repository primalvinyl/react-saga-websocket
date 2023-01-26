import { fork, all } from 'redux-saga/effects';
import { webSocketSaga, sendMessageWatcher } from './chat/sagas';

export default function* rootSaga() {
    yield all([
        fork(webSocketSaga),
        fork(sendMessageWatcher),
    ]);
};
