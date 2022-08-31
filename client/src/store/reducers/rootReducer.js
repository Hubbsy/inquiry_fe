import { combineReducers } from 'redux';
import session from './session';
import brokers from './brokers';
import affidavits from './affidavits';

export const rootReducer = combineReducers({
    session,
    brokers,
    affidavits
});
