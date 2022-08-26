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
    },
    brokers: {
        producing: {
            loading: false,
            data: [],
            error: null
        },
        life: {
            loading: false,
            data: [],
            error: null
        }
    }
};

export default storeState;
