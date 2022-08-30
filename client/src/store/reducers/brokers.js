import storeState from '../state';
import { TYPES } from '../actions/brokers';
import { combineReducers } from 'redux';

const producing = (state = storeState.brokers.producing, action) => {
    switch (action.type) {
        case TYPES.GET_PRODUCING_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                data: [],
                error: null
            };
        case TYPES.GET_PRODUCING_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                data: action.value
            };
        case TYPES.GET_PRODUCING_FAILURE:
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

const life = (state = storeState.brokers.life, action) => {
    switch (action.type) {
        case TYPES.GET_LIFE_BEGIN:
            return {
                ...state,
                loading: !state.loading,
                data: [],
                error: null
            };
        case TYPES.GET_LIFE_SUCCESS:
            return {
                ...state,
                loading: !state.loading,
                data: action.value
            };
        case TYPES.GET_LIFE_FAILURE:
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

const brokers = combineReducers({
    producing, 
    life
});

export default brokers;
