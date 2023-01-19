import * as types from './types';

export const chatMessageMock: types.ChatMessageType = {
    user: 'test',
    text: 'test',
};

export const chatMessageStoreMock: types.ChatMessageStoreType = {
    list: [chatMessageMock],
    status: 'connected',
}

export const chatMessageActionMock: types.ChatMessageActionType = {
    type: 'test',
    payload: chatMessageMock,
}
