import React from 'react';
import Search from '../components/LifeBrokers/Search';
import Table from '../components/LifeBrokers/Table';
import { connect } from 'react-redux';
import { getLifeBrokers } from '../store/actions/brokers';
import { Snackbar } from '@aeros-ui/components';

class LifeBrokers extends React.Component {
    state = {
        searchValue: '',
        rows: [],
        errorStyle: false,
        serverError: false,
        errorMessage: ''
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
            BROKERTYPE: 'L'
        };

        if (this.state.searchValue.length >= 3) {
            this.props.getLifeBrokers(this.props.endpoint, this.props.token, data);
        }
    };

    handleChange = (e) => {
        console.log(e.target);
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

    handleKeyPress = (e) => {
        console.log(e.target);
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.showRows();
        }
    };

    handleClose = (e) => {
        this.setState({
            serverError: !this.state.serverError
        });
    };

    handleClearInput = () => {
        this.setState({
            searchValue: ''
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
                    handleClearInput={this.handleClearInput}
                />
                <Table loading={this.props.loading} rows={this.state.rows} />
                <Snackbar
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    handleClose={this.handleClose}
                    message={this.state.errorMessage}
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
        token: state.session.auth.token,
        loading: state.brokers.life.loading,
        data: state.brokers.life.data,
        error: state.brokers.life.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLifeBrokers: (endpoint, token, data) =>
            dispatch(getLifeBrokers(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeBrokers);
