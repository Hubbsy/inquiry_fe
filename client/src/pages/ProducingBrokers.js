import React from 'react';
import Search from '../components/ProducingBrokers/Search';
import Table from '../components/ProducingBrokers/Table';
import { connect } from 'react-redux';
import { getProducingBrokers } from '../store/actions/brokers';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';

class ProducingBrokers extends React.Component {
    state = {
        searchValue: '',
        rows: [],
        errorStyle: false,
        serverError: false
    };

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data) &&
            !isEmpty(this.props.data)
        ) {
            if (this.props.data.hasOwnProperty('NODATA')) {
                this.setState({ rows: [] });
            } else {
                const data = this.props.data.map((company) => ({
                    licenseNo: company.LICENSENO,
                    brokerName: `${company.BROKERNAME1} ${company.BROKERNAME2}`,
                    effectiveDate: company.EFFECTIVEDATE,
                    expDate: company.EXPIRATIONDATE,
                    address: this.setCompanyAddress(company)
                }));

                this.setState({
                    rows: data
                });
            }
        }

        if (prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({ serverError: !this.state.serverError });
        }
    }

    handleChange = (e) => {
        if (e.target.value.length < 3) {
            this.setState({
                searchValue: e.target.value,
                errorStyle: true
            });
        } else {
            this.setState({
                searchValue: e.target.value,
                errorStyle: false
            });
        }
    };

    handleClearSearch = () => {
        this.setState({
            searchValue: ''
        });
    };

    setCompanyAddress(company) {
        return {
            address1: company.ADDRESS1,
            address2: company.ADDRESS2,
            address3: company.ADDRESS3,
            city: company.CITY,
            state: company.STATE,
            zip: company.ZIPCODE
        };
    }

    showRows = () => {
        const data = {
            COMBOSEARCH: this.state.searchValue,
            ACTIVEONLY: 'TRUE',
            BROKERTYPE: 'P'
        };

        if (this.state.searchValue.length >= 3) {
            this.props.getProducingBrokers(this.props.endpoint, this.props.token, data);
        }
    };

    handleKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.showRows();
        }
    };

    handleClose = (e) => {
        this.setState({
            serverError: !this.state.serverError
        });
    };

    render() {
        return (
            <>
                <Search
                    loading={this.props.loading}
                    errorStyle={this.state.errorStyle}
                    searchValue={this.state.searchValue}
                    handleChange={this.handleChange}
                    handleKeyPress={this.handleKeyPress}
                    showRows={this.showRows}
                    handleClearSearch={this.handleClearSearch}
                />
                <Table loading={this.props.loading} rows={this.state.rows} />
                <Snackbar
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    handleClose={this.handleClose}
                    message={this.props.error ? this.props.error : ''}
                    open={this.state.serverError}
                    severity={'error'}
                    title={'Something went wrong'}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        endpoint: state.session.endpoint,
        loading: state.brokers.producing.loading,
        data: state.brokers.producing.data,
        error: state.brokers.producing.error,
        token: state.session.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProducingBrokers: (endpoint, token, data) =>
            dispatch(getProducingBrokers(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducingBrokers);
