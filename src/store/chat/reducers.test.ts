import * as reducers from './reducers';
import * as mocks from './mocks';

describe('chat reducer', () => {
    it('should put new chat message', () => {
        const response = reducers.chatMessageReducer(
            undefined,
            reducers.putChatMessage(mocks.chatMessageStoreMock)
        );
        expect(response).toEqual(mocks.chatMessageStoreMock);
    });
});
