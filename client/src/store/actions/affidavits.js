import axios from 'axios';
export const TYPES = {
    GET_AFFIDAVITS_BEGIN: 'GET_AFFIDAVITS_BEGIN',
    GET_AFFIDAVITS_SUCCESS: 'GET_AFFIDAVITS_SUCCESS',
    GET_AFFIDAVITS_FAILURE: 'GET_AFFIDAVITS_FAILURE'
};

///////// PRODUCING BROKERS

const getAffidavitsBegin = () => {
    return {
        type: TYPES.GET_AFFIDAVITS_BEGIN
    };
};

const getAffidavitsSuccess = (data) => {
    return {
        type: TYPES.GET_AFFIDAVITS_SUCCESS,
        value: data
    };
};

const getAffidavitsFailure = (error) => {
    return {
        type: TYPES.GET_AFFIDAVITS_FAILURE,
        value: error
    };
};

export const getAffidavits = (endpoint, token, data) => {
    return (dispatch) => {
        dispatch(getAffidavitsBegin());
        return axios
            .post(`${endpoint}/affidavit-service/transaction/transactions`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.data.hasOwnProperty('DATA')) {
                    console.log("API response", response)
                    dispatch(getAffidavitsSuccess(response.data));
                } else if (response.data.ERRORMESSAGE.toLowerCase().includes('security')) {
                    window.localStorage.removeItem('TOKEN');
                    dispatch(getAffidavitsFailure(response.data.ERRORMESSAGE));
                } else if (response.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getAffidavitsFailure(response.data.ERRORMESSAGE));
                } else {
                    dispatch(
                        getAffidavitsFailure('An Error occurred while the request was processing')
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(
                    getAffidavitsFailure('An Error occurred while the request was processing')
                );
            });
    };
};
