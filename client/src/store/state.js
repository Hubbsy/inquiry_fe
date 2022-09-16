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
    },
    affidavits: {
        loading: false,
        data: [],
        error: null
    }
};

export default storeState;
