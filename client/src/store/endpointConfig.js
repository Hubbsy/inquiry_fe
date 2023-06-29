const endpointConfig = (env) => {
    let API_ENDPOINT;
    if (process.env.NODE_ENV === 'production') {
        switch (env) {
            case 'NYACOL':
                API_ENDPOINT = 'https://api-alpha.elany.org';
                break;
            case 'NYBCOL':
                API_ENDPOINT = 'https://api-beta.elany.org';
                break;
            case 'NYTCOL':
                API_ENDPOINT = 'https://api-test.elany.org';
                break;
            case 'NYPCOL':
                API_ENDPOINT = 'https://api.elany.org';
                break;
            default:
                break;
        }
    } else {
        API_ENDPOINT = 'http://api-alpha.elany.org';
    }
    return API_ENDPOINT;
};

export default endpointConfig;
