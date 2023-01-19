import { fork, all } from 'redux-saga/effects';
import { getChatMessageSaga, sendChatMessageWatcher } from './chat/sagas';

export default function* rootSaga() {
    yield all([
        fork(getChatMessageSaga),
        fork(sendChatMessageWatcher),
    ]);
};
