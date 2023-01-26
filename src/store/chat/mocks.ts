import * as types from './types';

export const messageMock: types.MessageType = {
    user: 'test',
    text: 'test',
};

export const messageStoreMock: types.messageStoreType = {
    list: [messageMock],
    status: 'connected',
}

export const messageActionMock: types.MessageActionType = {
    type: 'test',
    payload: messageMock,
}
