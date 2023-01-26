export interface MessageType {
    user: string;
    text: string;
}

export const messageDefault: MessageType = {
    user: '',
    text: '',
};

export interface messageStoreType {
    list: Array<MessageType>;
    status: 'connected' | 'disconnected';
}

export const messageStoreDefault: messageStoreType = {
    list: [],
    status: 'disconnected',
};

export interface MessageActionType {
    type: string;
    payload: MessageType
}
