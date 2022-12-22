import { ErrorBoundary, Snackbar } from '@aeros-ui/components';
import Header from '../components/DecliningCompanies/header';
import DataTable from '../components/DecliningCompanies/table';
import { connect } from 'react-redux';
import { getDecliningCompanies, getDecliningData } from '../store/actions/decliningCompanies';
import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';

const DecliningCompanies = ({
    getDecliningCompanies,
    getDecliningData,
    endpoint,
    token,
    error,
    compData,
    compError,
    declError,
    declData,
    declLoading
}) => {
    // const [rows, setRows] = useState([]);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        'An error occured while the request was processesing, please try again.'
    );
    const getDeclRan = useRef(false);

    useEffect(() => {
        if (token && getDeclRan.current === false) {
            getDecliningCompanies(endpoint, token);

            return () => {
                getDeclRan.current = true;
            };
        }
        if (error) {
            setErrorMessage(error);
            setShowSnackBar(true);
        }

        if (declError && !declData.length) {
            if (declError === 'DATA') {
                setShowSnackBar(true);
            } else {
                setShowSnackBar(true);
                setErrorMessage(declError);
            }
        }
        if (compError) {
            setErrorMessage(compError);
            setShowSnackBar(true);
        }
    }, [token, error, declError, compError]);

    const handleClose = () => {
        setShowSnackBar(false);
    };

    const handleSearch = (org, search) => {
        let data = {
            COMBOSEARCH: search,
            ACTIVEONLY: 'TRUE',
            ORGANIZATIONTYPE: org
        };
        getDecliningData(endpoint, token, data);
    };

    const handleOrgType = (type) => {
        for (const comp in compData) {
            if (type === compData[comp].CODE) {
                return compData[comp].DESCRIPTION;
            }
        }
    };

    return (
        <ErrorBoundary>
            <Header organizations={compData} onSearch={handleSearch} loading={declLoading} />
            <DataTable handleOrgType={handleOrgType} compData={compData} />
            <Grid item container xs={2}>
                <Snackbar
                    open={showSnackBar}
                    handleClose={handleClose}
                    severity='error'
                    title='Something went wrong'
                    message={errorMessage ?? ''}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}></Snackbar>
            </Grid>
        </ErrorBoundary>
    );
};

const mapStateToProps = (state) => {
    return {
        endpoint: state.session.endpoint,
        token: state.session.auth.token,
        error: state.session.auth.error,
        compLoading: state.decliningCompanies.companies.loading,
        compData: state.decliningCompanies.companies.data,
        compError: state.decliningCompanies.companies.error,
        declLoading: state.decliningCompanies.decliningData.loading,
        declData: state.decliningCompanies.decliningData.data,
        declError: state.decliningCompanies.decliningData.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDecliningCompanies: (endpoint, token) =>
            dispatch(getDecliningCompanies(endpoint, token)),
        getDecliningData: (endpoint, token, data) =>
            dispatch(getDecliningData(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecliningCompanies);
