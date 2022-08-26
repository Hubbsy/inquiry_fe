import { combineReducers } from 'redux';
import session from './session';
import decliningCompanies from './decliningCompanies';

export const rootReducer = combineReducers({
    session,
    decliningCompanies
});
