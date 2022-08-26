import { combineReducers } from 'redux';
import session from './session';
import brokers from './brokers';

export const rootReducer = combineReducers({
    session,
    brokers
});
