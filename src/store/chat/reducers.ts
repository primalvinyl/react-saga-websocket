import { createSlice } from '@reduxjs/toolkit';
import { messageStoreDefault } from './types';

const message = createSlice({
    name: 'message',
    initialState: messageStoreDefault,
    reducers: {
        putMessage: (state , { payload }) => {
            return {
                list: [...state.list, ...payload.list || []],
                status: payload.status || state.status,
            }
        }
    }
});

export const { putMessage } = message.actions;
export const messageReducer = message.reducer;
