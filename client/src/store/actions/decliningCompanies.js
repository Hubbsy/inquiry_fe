export const TYPES = {
    GET_COMPANIES_BEGIN: 'GET_COMPANIES_BEGIN',
    GET_COMPANIES_SUCCESS: 'GET_COMPANIES_SUCCESS',
    GET_COMPANIES_FAILURE: 'GET_COMPANIES_FAILURE'
};

const getCompaniesBegin = () => {
    return {
        type: TYPES.GET_COMPANIES_BEGIN
    };
};

const getCompaniesSuccess = (data) => {
    return {
        type: TYPES.GET_COMPANIES_SUCCESS,
        value: data
    };
};

const getCompaniesFailure = (error) => {
    return {
        type: TYPES.GET_COMPANIES_FAILURE,
        value: error
    };
};

export { getCompaniesBegin, getCompaniesSuccess, getCompaniesFailure };
