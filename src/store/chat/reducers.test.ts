import * as reducers from './reducers';
import * as types from './types';
import * as mocks from './mocks';

describe('chat reducer', () => {
    it('should handle an unknown action', () => {
        const response = reducers.messageReducer(
            undefined,
            { type: 'unknown' });
        expect(response).toEqual({ list: [], status: 'disconnected' });
    })

    it('should put new chat message', () => {
        const response = reducers.messageReducer(
            undefined,
            reducers.putMessage(mocks.messageStoreMock)
        );
        expect(response).toEqual(mocks.messageStoreMock);
    });
});
