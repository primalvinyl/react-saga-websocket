export interface ChatMessageType {
    user: string;
    text: string;
}

export const chatMessageDefault: ChatMessageType = {
    user: '',
    text: '',
};

export interface ChatMessageStoreType {
    list: Array<ChatMessageType>;
    status: 'connected' | 'disconnected';
}

export const chatMessageStoreDefault: ChatMessageStoreType = {
    list: [],
    status: 'disconnected',
};

export interface ChatMessageActionType {
    type: string;
    payload: ChatMessageType
}
