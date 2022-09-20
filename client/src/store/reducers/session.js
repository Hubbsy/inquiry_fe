import storeState from '../state';
import { TYPES } from '../actions/session';
import { combineReducers } from 'redux';

// const ip = (state = storeState.session.ip, action) => {
//     switch (action.type) {
//         case TYPES.SET_IP_ADDRESS:
//             return action.value;
//         default:
//             return state;
//     }
// };

const endpoint = (state = storeState.session.endpoint, action) => {
    switch (action.type) {
        case TYPES.SET_ENDPOINT:
            return action.value;
        default:
            return state;
    }
};

const sessionTimeout = (state = storeState.session.sessionTimeout, action) => {
    switch (action.type) {
        case TYPES.SET_SESSION_TIMEOUT:
            return action.value;
        default:
            return state;
    }
};

const auth = (state = storeState.session.auth, action) => {
    switch (action.type) {
        case TYPES.GET_TOKEN_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                token: null,
                error: null
            };
        case TYPES.GET_TOKEN_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                token: action.value
            };
        case TYPES.GET_TOKEN_FAILURE:
            return {
                ...state,
                loading: !state.loading,
                error: action.value,
                token: null
            };
        case TYPES.SET_TOKEN:
            return {
                ...state,
                token: action.value
            };
        default:
            return { ...state };
    }
};

const session = combineReducers({ auth, endpoint, sessionTimeout });
export default session;

// const session = (state = storeState.session, action) => {
//     switch (action.type) {
//         case TYPES.SET_TOKEN:
//             return {
//                 ...state,
//                 token: action.value
//             };
//         case TYPES.SET_IP_ADDRESS:
//             return {
//                 ...state,
//                 ip: action.value
//             };
//         case TYPES.SET_ENDPOINT:
//             return {
//                 ...state,
//                 endpoint: action.value
//             };
//         case TYPES.SET_SESSION_TIMEOUT:
//             return {
//                 ...state,
//                 sessionTimeout: action.value
//             };
//         default:
//             return state;
//     }
// };

// export default session;
