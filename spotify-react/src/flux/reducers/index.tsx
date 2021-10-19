import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyReducer from './spotifyReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    auth: authReducer,
    spotify: spotifyReducer,
    ui: uiReducer
});
