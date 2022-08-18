import storeState from '../state';
import { TYPES } from '../actions/session';

const session = (state = storeState.session, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return {
                ...state,
                token: action.value
            };
        case TYPES.SET_IP_ADDRESS:
            return {
                ...state,
                ip: action.value
            };
        case TYPES.SET_ENDPOINT:
            return {
                ...state,
                endpoint: action.value
            };
        case TYPES.SET_SESSION_TIMEOUT:
            return {
                ...state,
                sessionTimeout: action.value
            };
        default:
            return state;
    }
};

export default session;
