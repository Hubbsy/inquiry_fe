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
        companies: [
            {
                code: 'ALL',
                description: 'ALL'
            }
        ],
        data: [
            {
                companyName: '',
                naic: null,
                domicile: '',
                orgType: '',
                id: null
            }
        ]
    }
};

export default storeState;
