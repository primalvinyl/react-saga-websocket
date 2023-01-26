import * as sagas from './sagas';
import * as mocks from './mocks';

describe('sendMessage', () => {
    it('returns an action object', () => {
        const expectedResult = {
            type: sagas.sendMessage.toString(),
            payload: mocks.messageMock,
        };
        const actualResult = sagas.sendMessage(mocks.messageMock);
        expect(actualResult).toEqual(expectedResult);
    });
});
