import axios from 'axios';

export const TYPES = {
    //companies state
    GET_COMPANIES_BEGIN: 'GET_COMPANIES_BEGIN',
    GET_COMPANIES_SUCCESS: 'GET_COMPANIES_SUCCESS',
    GET_COMPANIES_FAILURE: 'GET_COMPANIES_FAILURE',
    // decliningData state
    GET_DECLINING_DATA_BEGIN: 'GET_DECLINING_DATA_BEGIN',
    GET_DECLINING_DATA_SUCCESS: 'GET_DECLINING_DATA_SUCCESS',
    GET_DECLINING_DATA_FAILURE: 'GET_DECLINING_DATA_FAILURE'
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

const getDecliningDataBegin = () => {
    return {
        type: TYPES.GET_DECLINING_DATA_BEGIN
    };
};

const getDecliningDataSuccess = (data) => {
    return {
        type: TYPES.GET_DECLINING_DATA_SUCCESS,
        value: data
    };
};

const getDecliningDataFailure = (error) => {
    return {
        type: TYPES.GET_DECLINING_DATA_FAILURE,
        value: error
    };
};

const getDecliningCompanies = (endpoint, token) => {
    return (dispatch) => {
        dispatch(getCompaniesBegin());
        return axios
            .get(`${endpoint}/code-service/company/declination-organization-types`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data.hasOwnProperty('DATA')) {
                    dispatch(getCompaniesSuccess(res.data.DATA));
                } else if (res.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getCompaniesFailure(res.data.ERRORMESSAGE));
                } else {
                    dispatch(
                        getCompaniesFailure(
                            'An error occured while the request was processesing, please try again.'
                        )
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(
                    getCompaniesFailure(
                        'An error occured while the request was processesing, please try again.'
                    )
                );
            });
    };
};

const getDecliningData = (endpoint, token, data) => {
    return (dispatch) => {
        dispatch(getDecliningDataBegin());
        return axios
            .post(`${endpoint}/code-service/company/declination-companies`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data.hasOwnProperty('DATA')) {
                    dispatch(getDecliningDataSuccess(res.data.DATA));
                } else if (res.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getDecliningDataFailure(res.data.ERRORMESSAGE));
                } else {
                    dispatch(
                        getDecliningDataFailure(
                            'An error occured while the request was processesing, please try again.'
                        )
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(
                    getDecliningDataFailure(
                        'An error occured while the request was processesing, please try again.'
                    )
                );
            });
    };
};

export {
    getCompaniesBegin,
    getCompaniesSuccess,
    getCompaniesFailure,
    getDecliningDataBegin,
    getDecliningDataSuccess,
    getDecliningDataFailure,
    getDecliningCompanies,
    getDecliningData
};
