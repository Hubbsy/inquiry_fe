import axios from 'axios';
export const TYPES = {
    SET_TOKEN: 'SET_TOKEN',
    SET_ENDPOINT: 'SET_ENDPOINT',
    SET_USER_GUIDE_URL: 'SET_USER_GUIDE_URL',
    SET_SESSION_TIMEOUT: 'SET_SESSION_TIMEOUT',
    GET_TOKEN_BEGIN: 'GET_TOKEN_BEGIN',
    GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS',
    GET_TOKEN_FAILURE: 'GET_TOKEN_FAILURE'
};

export const setToken = (token) => {
    return {
        type: TYPES.SET_TOKEN,
        value: token
    };
};

export const setEndpoint = (endpoint) => {
    return {
        type: TYPES.SET_ENDPOINT,
        value: endpoint
    };
};

export const setUserGuideURL = (url) => {
    return {
        type: TYPES.SET_USER_GUIDE_URL,
        value: url
    };
};

export const setSessionTimeout = (bool) => {
    return {
        type: TYPES.SET_SESSION_TIMEOUT,
        value: bool
    };
};

const getTokenBegin = () => {
    return {
        type: TYPES.GET_TOKEN_BEGIN
    };
};

const getTokenSuccess = (data) => {
    return {
        type: TYPES.GET_TOKEN_SUCCESS,
        value: data
    };
};

const getTokenFailure = (error) => {
    return {
        type: TYPES.GET_TOKEN_FAILURE,
        value: error
    };
};

export const getToken = (endpoint, data) => {
    return (dispatch) => {
        dispatch(getTokenBegin());
        return axios
            .post(`${endpoint}/utilities/security/generate-security-token`, data)
            .then((res) => {
                console.log('RESPONSE GET TOKEN:', res.data);
                if (res.data.hasOwnProperty('TOKEN')) {
                    dispatch(getTokenSuccess(res.data.TOKEN));
                } else if (res.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getTokenFailure(res.data.ERRORMESSAGE));
                    dispatch(setSessionTimeout(true));
                } else {
                    dispatch(getTokenFailure('An error occurred during authentication.'));
                }
            })
            .catch((error) => {
                console.log('ERROR GET TOKEN:', error);
                dispatch(getTokenFailure('An error occurred during authentication.'));
            });
    };
};

export const verifyAuth = (endpoint, data) => {
    return (dispatch) => {
        dispatch(getTokenBegin());
        return axios
            .post(`${endpoint}/utilities/security/validate-service-request`, data)
            .then((res) => {
                console.log('RESPONSE VERIFY AUTH:', res.data);
                if (res.data.hasOwnProperty('TOKEN')) {
                    dispatch(getTokenSuccess(res.data.TOKEN));
                } else if (res.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getTokenFailure(res.data.ERRORMESSAGE));
                    dispatch(setSessionTimeout(true));
                } else {
                    dispatch(getTokenFailure('An error occurred during authentication.'));
                }
            })
            .catch((error) => {
                console.log('ERROR VERIFY AUTH:', error);
                dispatch(getTokenFailure('An error occurred during authentication.'));
            });
    };
};
