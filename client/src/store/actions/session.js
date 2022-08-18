export const TYPES = {
    SET_TOKEN: 'SET_TOKEN',
    SET_ENDPOINT: 'SET_ENDPOINT',
    SET_SESSION_TIMEOUT: 'SET_SESSION_TIMEOUT',
    SET_IP_ADDRESS: 'SET_IP_ADDRESS'
};

export const setToken = (token) => {
    return {
        type: TYPES.SET_TOKEN,
        value: token
    };
};

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
