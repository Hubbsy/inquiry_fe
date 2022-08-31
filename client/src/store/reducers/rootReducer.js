import { combineReducers } from 'redux';
import session from './session';
import decliningCompanies from './decliningCompanies';
import brokers from './brokers';

export const rootReducer = combineReducers({
    session,
    brokers,
    decliningCompanies
});
