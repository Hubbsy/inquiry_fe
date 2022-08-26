import { combineReducers } from 'redux';
import storeState from '../state';
import { TYPES } from '../actions/decliningCompanies';

// const auth = (state = storeState.session.auth, action) => {
//     switch (action.type) {
//         case TYPES.GET_TOKEN_BEGIN:
//             return {
//                 ...state,
//                 loading: !state.loading,
//                 token: null,
//                 error: null
//             };
//         case TYPES.GET_TOKEN_SUCCESS:
//             return {
//                 ...state,
//                 loading: !state.loading,
//                 token: action.value
//             };
//         case TYPES.GET_TOKEN_FAILURE:
//             return {
//                 ...state,
//                 loading: !state.loading,
//                 error: action.value,
//                 token: null
//             };
//         default:
//             return { ...state };
//     }
// };
const companies = (state = storeState.companies, action) => {
    switch (action.type) {
        case TYPES.GET_COMPANIES_BEGIN:
            return [{ ...state, code: 'ALL', description: 'ALL' }];
        case TYPES.GET_COMPANIES_SUCCESS:
            return [...state, action.payload];
        default:
            return { ...state };
    }
};

const decliningCompanies = combineReducers({ companies });
export default decliningCompanies;
