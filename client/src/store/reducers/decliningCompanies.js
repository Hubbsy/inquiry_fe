import { combineReducers } from 'redux';
import storeState from '../state';
import { TYPES } from '../actions/decliningCompanies';

const companies = (state = storeState.decliningCompanies.companies, action) => {
    switch (action.type) {
        case TYPES.GET_COMPANIES_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                data: [],
                error: null
            };
        case TYPES.GET_COMPANIES_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                data: action.value
            };
        case TYPES.GET_COMPANIES_FAILURE:
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

const decliningData = (state = storeState.decliningCompanies.decliningData, action) => {
    switch (action.type) {
        case TYPES.GET_DECLINING_DATA_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                data: [],
                error: null
            };
        case TYPES.GET_DECLINING_DATA_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                data: action.value
            };
        case TYPES.GET_DECLINING_DATA_FAILURE:
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

const decliningCompanies = combineReducers({ companies, decliningData });
export default decliningCompanies;
