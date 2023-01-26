import { combineReducers } from 'redux';
import { messageReducer } from './chat/reducers';

export default combineReducers({
    messages: messageReducer,
});
