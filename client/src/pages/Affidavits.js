import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';

class Affidavits extends React.Component {
    state = {
        searchValue: '',
        rows: [],
        errorStyle: false,
        serverError: false,
        errorMessage: '',
        adjustPadding: false
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
            this.props.getAffidavits(this.props.endpoint, this.props.token, data);
        } else {
            this.setState({
                errorStyle: true
            });
        }
    };

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
            errorStyle: false
        });
    };

    handleKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.showRows();
        } else if (e.charCode === 13) {
            this.setState({
                errorStyle: true
            });
        }
    };

    handleClose = () => {
        this.setState({
            serverError: !this.state.serverError
        });
    };

    handleClearInput = () => {
        this.setState({
            searchValue: ''
        });
    };

    handleHelperText = () => {
        this.setState({
            errorStyle: false
        });
    };

    handleAdjustPadding = () => {
        this.setState({
            adjustPadding: !this.state.adjustPadding
        })
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
                    handleHelperText={this.handleHelperText}
                    adjustPadding={this.state.adjustPadding}
                    handleAdjustPadding={this.handleAdjustPadding}
                />
                <Table 
                    loading={this.props.loading} 
                    rows={this.state.rows} 
                    adjustPadding={this.state.adjustPadding}
                />
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
        token: state.session.auth.token,
        loading: state.affidavits.loading,
        data: state.affidavits.data,
        error: state.affidavits.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAffidavits: (endpoint, token, data) => dispatch(getAffidavits(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Affidavits);