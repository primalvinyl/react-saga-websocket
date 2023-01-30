import { fork, all } from 'redux-saga/effects';
import { webSocketSaga } from './chat/sagas';

export default function* rootSaga() {
    yield all([
        fork(webSocketSaga),
    ]);
};
