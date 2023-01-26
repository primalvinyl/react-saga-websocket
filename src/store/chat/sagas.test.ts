import { expectSaga } from 'redux-saga-test-plan';
import * as reducers from './reducers';
import * as sagas from './sagas';

describe('webSocketSaga', () => {
    it('starts channel and subscribes', () => {
        return expectSaga(sagas.webSocketSaga)
            .call(sagas.webSocketListener)
            .dispatch({ type: 'test' })
            .silentRun();
    });

    it('gets and puts data', async () => {
        return expectSaga(sagas.webSocketSaga)
            .put(reducers.putMessage({
                list: [{ user: 'Client', text: 'Disconnected from server.' }],
                status: 'disconnected'
            }))
            .withReducer(reducers.messageReducer)
            .hasFinalState({
                list: [{ user: 'Client', text: 'Disconnected from server.' }],
                status: 'disconnected'
            })
            .silentRun();
    });
});

describe('sendMessageWorker', () => {
    const mockMessage = { user: 'test', text: 'test' };

    it('gets and puts data', () => {
        return expectSaga(sagas.sendMessageWorker, {
            type: 'test',
            payload: mockMessage
        })
            .put(reducers.putMessage({ list: [mockMessage] }))
            .withReducer(reducers.messageReducer)
            .hasFinalState({ list: [mockMessage], status: 'disconnected' })
            .run();
    });
});

describe('sendMessageWatcher', () => {
    it('listens for action', () => {
        return expectSaga(sagas.sendMessageWatcher)
            .dispatch(sagas.sendMessage({ user: 'test', text: 'test' }))
            .silentRun();
    });
});
