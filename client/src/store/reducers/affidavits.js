import storeState from '../state';
import { TYPES } from '../actions/affidavits';
// import { combineReducers } from 'redux';

const affidavits = (state = storeState.affidavits, action) => {
    switch (action.type) {
        case TYPES.GET_AFFIDAVITS_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                data: [],
                error: null
            };
        case TYPES.GET_AFFIDAVITS_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                data: action.value
            };
        case TYPES.GET_AFFIDAVITS_FAILURE:
            return {
                ...state,
                loading: !state.loading,
                error: action.value,
                data: []
            };
        default:
            return { ...state };
    }
};

export default affidavits;