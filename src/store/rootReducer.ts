import { combineReducers } from 'redux';
import { chatMessageReducer } from './chat/reducers';

export default combineReducers({
    messages: chatMessageReducer,
});
