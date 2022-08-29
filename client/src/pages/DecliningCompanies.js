import { ErrorBoundary, Snackbar } from '@aeros-ui/components';
import Header from '../components/DecliningCompanies/header';
import DataTable from '../components/DecliningCompanies/table';
import { useShowRows } from '../hooks/DecliningCompanies/useShowRows';
import { useShowOrg } from '../hooks/DecliningCompanies/useShowOrg';
import { connect } from 'react-redux';
import { getDecliningCompanies, getDecliningData } from '../store/actions/decliningCompanies';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

const DecliningCompanies = ({
    getDecliningCompanies,
    getDecliningData,
    endpoint,
    token,
    compData,
    compError,
    declError,
    declData
}) => {
    const { showRows, rows } = useShowRows();
    const [showSnackBar, setShowSnackBar] = useState(false);

    useEffect(() => {
        if (token) {
            getDecliningCompanies(endpoint, token);
        }
    }, [token]);

    useEffect(() => {
        if (compError) {
            setShowSnackBar(true);
        } else if (!compError) {
            setShowSnackBar(false);
        }
    }, [compError]);

    useEffect(() => {
        if (rows.length) {
            console.log('rows: ', rows);
            showRows(declData);
        }
    }, [rows]);

    const handleClose = () => {
        setShowSnackBar(false);
    };

    const handleSearch = (org, search) => {
        console.log({ org, search });
        let data = {
            COMBOSEARCH: search,
            ACTIVEONLY: 'TRUE',
            ORGANIZATIONTYPE: org
        };
        getDecliningData(endpoint, token, data);
    };

    return (
        <ErrorBoundary>
            <Header onShowRows={showRows} organizations={compData} onSearch={handleSearch} />
            <DataTable rows={rows} />
            <Grid item container xs={2}>
                {showSnackBar === true ? (
                    <Snackbar
                        sx={{ width: '10px' }}
                        open={showSnackBar}
                        handleClose={handleClose}
                        severity='error'
                        title='Something went wrong'
                        message={
                            'An error occured while the request was processing, please try again.'
                        }
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}></Snackbar>
                ) : null}
            </Grid>
            {console.log(compError, showSnackBar)}
        </ErrorBoundary>
    );
};

const mapStateToProps = (state) => {
    return {
        endpoint: state.session.endpoint,
        token: state.session.auth.token,
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
