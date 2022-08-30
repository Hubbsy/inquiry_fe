import { ErrorBoundary, Snackbar } from '@aeros-ui/components';
import Header from '../components/DecliningCompanies/header';
import DataTable from '../components/DecliningCompanies/table';
import { connect } from 'react-redux';
import { getDecliningCompanies, getDecliningData } from '../store/actions/decliningCompanies';
import { useEffect, useState } from 'react';
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
    const [rows, setRows] = useState([]);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('An error occured.');

    useEffect(() => {
        if (!token || error) {
            setErrorMessage(error);
            setShowSnackBar(true);
        }

        if (declError) {
            setErrorMessage(declError);
            setShowSnackBar(true);
        }
        if (compError) {
            setErrorMessage(compError);
            setShowSnackBar(true);
        }
    }, [error, declError, compError]);

    useEffect(() => {
        if (token) {
            getDecliningCompanies(endpoint, token);
        } else if (!token || error) {
            setShowSnackBar(true);
        }
    }, [token]);

    useEffect(() => {
        if (compError) {
            setShowSnackBar(true);
        } else if (!compError) {
            setShowSnackBar(false);
        }
    }, [compError]);

    const handleClose = () => {
        setShowSnackBar(false);
    };

    useEffect(() => {
        if (declData.length !== undefined) {
            setRows(
                declData.map((company) => ({
                    id: company.DECLINECOMPID,
                    naic: company.NAIC,
                    companyName: company.COMPANYNAME,
                    domicile: company.DOMICILE,
                    orgType: handleOrgType(company.ORGTYPE)
                }))
            );
        } else if (declError) {
            setShowSnackBar(true);
        }
    }, [declData.length]);

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
            <DataTable rows={rows} loading={declLoading} />
            <Grid item container xs={2}>
                {showSnackBar === true ? (
                    <Snackbar
                        open={showSnackBar}
                        handleClose={handleClose}
                        severity='error'
                        title='Something went wrong'
                        message={errorMessage}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}></Snackbar>
                ) : null}
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
