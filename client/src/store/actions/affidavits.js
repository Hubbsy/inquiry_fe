import axios from 'axios';
import { setSessionTimeout } from './session';
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
                console.log('RESPONSE GET AFFIDAVITS:', response.data);
                if (response.data.hasOwnProperty('DATA')) {
                    dispatch(getAffidavitsSuccess(response.data));
                } else if (response.data.hasOwnProperty('ERRORMESSAGE')) {
                    dispatch(getAffidavitsFailure(response.data.ERRORMESSAGE));
                    if (response.data.ERRORMESSAGE.toLowerCase().includes('security')) {
                        if (process.env.NODE_ENV === 'production') {
                            dispatch(setSessionTimeout(true));
                        } else {
                            window.localStorage.removeItem('TOKEN');
                        }
                    }
                } else {
                    dispatch(
                        getAffidavitsFailure('An Error occurred while the request was processing')
                    );
                }
            })
            .catch((err) => {
                console.error('ERROR GET AFFIDAVITS:', err);
                dispatch(
                    getAffidavitsFailure('An Error occurred while the request was processing')
                );
            });
    };
};
