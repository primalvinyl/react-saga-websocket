import * as sagas from './sagas';
import * as mocks from './mocks';

describe('sendChatMessage', () => {
    it('returns an action object', () => {
        const expectedResult = {
            type: sagas.sendChatMessage.toString(),
            payload: mocks.chatMessageMock,
        };
        const actualResult = sagas.sendChatMessage(mocks.chatMessageMock);
        expect(actualResult).toEqual(expectedResult);
    });
});
