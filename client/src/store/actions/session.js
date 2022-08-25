import axios from 'axios';
export const TYPES = {
    // SET_TOKEN: 'SET_TOKEN',
    SET_ENDPOINT: 'SET_ENDPOINT',
    SET_SESSION_TIMEOUT: 'SET_SESSION_TIMEOUT',
    SET_IP_ADDRESS: 'SET_IP_ADDRESS',
    GET_TOKEN_BEGIN: 'GET_TOKEN_BEGIN',
    GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS',
    GET_TOKEN_FAILURE: 'GET_TOKEN_FAILURE'
};

// export const setToken = (token) => {
//     return {
//         type: TYPES.SET_TOKEN,
//         value: token
//     };
// };

export const setIpAddress = (ip) => {
    return {
        type: TYPES.SET_IP_ADDRESS,
        value: ip
    };
};

export const setEndpoint = (endpoint) => {
    return {
        type: TYPES.SET_ENDPOINT,
        value: endpoint
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
