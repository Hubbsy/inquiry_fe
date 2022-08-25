const storeState = {
    session: {
        auth: {
            loading: false,
            token: null,
            error: null
        },
        ip: null,
        endpoint: null,
        sessionTimeout: false
    }
};

export default storeState;
