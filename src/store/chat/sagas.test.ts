import { expectSaga } from 'redux-saga-test-plan';
import * as reducers from './reducers';
import * as sagas from './sagas';

describe('getChatMessageSaga', () => {
    it('starts channel and subscribes', () => {
        return expectSaga(sagas.getChatMessageSaga)
            .call(sagas.chatListener)
            .dispatch({ type: 'test' })
            .silentRun();
    });

    it('gets and puts data', async () => {
        return expectSaga(sagas.getChatMessageSaga)
            .put(reducers.putChatMessage({
                list: [{ user: 'Client', text: 'Disconnected from server.' }],
                status: 'disconnected'
            }))
            .withReducer(reducers.chatMessageReducer)
            .hasFinalState({
                list: [{ user: 'Client', text: 'Disconnected from server.' }],
                status: 'disconnected'
            })
            .silentRun();
    });
});

describe('sendChatMessageWorker', () => {
    const mockMessage = { user: 'test', text: 'test' };

    it('gets and puts data', () => {
        return expectSaga(sagas.sendChatMessageWorker, {
            type: 'test',
            payload: mockMessage
        })
            .put(reducers.putChatMessage({ list: [mockMessage] }))
            .withReducer(reducers.chatMessageReducer)
            .hasFinalState({ list: [mockMessage], status: 'disconnected' })
            .run();
    });
});

describe('sendChatMessageWatcher', () => {
    it('listens for action', () => {
        return expectSaga(sagas.sendChatMessageWatcher)
            .dispatch(sagas.sendChatMessage({ user: 'test', text: 'test' }))
            .silentRun();
    });
});
