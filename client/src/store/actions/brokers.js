import axios from 'axios';
export const TYPES = {
    GET_PRODUCING_BEGIN: 'GET_PRODUCING_BEGIN',
    GET_PRODUCING_SUCCESS: 'GET_PRODUCING_SUCCESS',
    GET_PRODUCING_FAILURE: 'GET_PRODUCING_FAILURE',
    GET_LIFE_BEGIN: 'GET_LIFE_BEGIN',
    GET_LIFE_SUCCESS: 'GET_LIFE_SUCCESS',
    GET_LIFE_FAILURE: 'GET_LIFE_FAILURE'
};

///////// PRODUCING BROKERS

const getProducingBegin = () => {
    return {
        type: TYPES.GET_PRODUCING_BEGIN
    };
};

const getProducingSuccess = (data) => {
    return {
        type: TYPES.GET_PRODUCING_SUCCESS,
        value: data
    };
};

const getProducingFailure = (error) => {
    return {
        type: TYPES.GET_PRODUCING_FAILURE,
        value: error
    };
};

export const getProducingBrokers = (endpoint, token, data) => {
    return (dispatch) => {
        dispatch(getProducingBegin());
        return axios
            .post(`${endpoint}/code-service/broker/producing-brokers`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log('RESPONSE GET PRODUCING BROKERS:', response.data);
                if (response.data.hasOwnProperty('DATA')) {
                    dispatch(getProducingSuccess(response.data.DATA));
                } else if (response.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getProducingFailure(response.data.ERRORMESSAGE));
                } else {
                    dispatch(
                        getProducingFailure('An Error occurred while the request was processing')
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(getProducingFailure('An Error occurred while the request was processing'));
            });
    };
};

///////// LIFE BROKERS

const getLifeBegin = () => {
    return {
        type: TYPES.GET_LIFE_BEGIN
    };
};

const getLifeSuccess = (data) => {
    return {
        type: TYPES.GET_LIFE_SUCCESS,
        value: data
    };
};

const getLifeFailure = (error) => {
    return {
        type: TYPES.GET_LIFE_FAILURE,
        value: error
    };
};

export const getLifeBrokers = (endpoint, token, data) => {
    return (dispatch) => {
        dispatch(getLifeBegin());
        return axios
            .post(`${endpoint}/code-service/broker/producing-brokers`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log('RESPONSE GET LIFE BROKER:', response.data);
                if (response.data.hasOwnProperty('DATA')) {
                    dispatch(getLifeSuccess(response.data.DATA));
                } else if (response.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getLifeFailure(response.data.ERRORMESSAGE));
                } else {
                    dispatch(getLifeFailure('An Error occurred while the request was processing'));
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(getLifeFailure('An Error occurred while the request was processing'));
            });
    };
};
