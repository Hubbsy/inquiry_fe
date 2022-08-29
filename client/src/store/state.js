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
    decliningCompanies: {
        companies: { data: [], loading: false, error: null },
        decliningData: { data: [], loading: false, error: null }
    }
};

export default storeState;
