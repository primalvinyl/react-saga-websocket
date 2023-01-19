import { createSlice } from '@reduxjs/toolkit';
import { chatMessageStoreDefault } from './types';

const chatMessage = createSlice({
    name: 'chatMessage',
    initialState: chatMessageStoreDefault,
    reducers: {
        putChatMessage: (state , { payload }) => {
            return {
                list: [...state.list, ...payload.list || []],
                status: payload.status || state.status,
            }
        }
    }
});

export const { putChatMessage } = chatMessage.actions;
export const chatMessageReducer = chatMessage.reducer;
