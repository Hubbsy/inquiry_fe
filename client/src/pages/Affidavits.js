import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { format, isValid } from 'date-fns';

class Affidavits extends React.Component {
    state = {
        rows: [],
        errorStyle: false,
        datesRangeError: {
            active: false, 
            message: null
        },
        serverError: false,
        errorMessage: '',
        adjustPadding: false,
        advancedSearchActive: false,
        standardSearch: {
            searchValue: '',
            INCEPTIONFROM: null,
            INCEPTIONTO: null,
        },
        advancedSearch: {
            AFFIDAVITNUMBER: '',
            POLICYNUMBER: '',
            INSUREDNAME: '',
            INCEPTIONFROM: '',
            INCEPTIONTO: '',
            CONTACTNAME: '',
            BROKERREFERENCE: '',
            BATCH: '',
            PREMIUMFROM: '',
            PREMIUMTO: ''
        }
    };

    componentDidUpdate(prevProps) {
        console.log("prev Props:", prevProps);
        console.log("props:", this.props);
        console.log("state", this.state);

        if (prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({ serverError: !this.state.serverError });
        }
        if ((JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) && !isEmpty(this.props.data)){
            if (this.props.data.hasOwnProperty('NODATA')) {
                this.setState({ rows: [] });
            } else {
                console.log(this.props.data);
            }
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

    executeSearch = () => {
        const data = {
            COMBOSEARCH: this.state.standardSearch.searchValue,
            AFFIDAVITNUMBER: this.state.advancedSearch.AFFIDAVITNUMBER,
            POLICYNUMBER: this.state.advancedSearch.POLICYNUMBER,
            INSUREDNAME: this.state.advancedSearch.INSUREDNAME,
            INCEPTIONFROM: this.state.advancedSearch.INCEPTIONFROM,
            INCEPTIONTO: this.state.advancedSearch.INCEPTIONTO,
            CONTACTNAME: this.state.advancedSearch.CONTACTNAME,
            BROKERREFERENCE: this.state.advancedSearch.BROKERREFERENCE,
            BATCH: this.state.advancedSearch.BATCH,
            PREMIUMFROM: this.state.advancedSearch.PREMIUMFROM,
            PREMIUMTO: this.state.advancedSearch.PREMIUMTO
        };

        if (this.checkValidSearchParams()) {
            this.props.getAffidavits(this.props.endpoint, this.props.token, data);
        }
    };

    //  WIP
    checkValidSearchParams = () => {
        if (!this.state.advancedSearchActive) {
            console.log("checking params 1!!")
            if (this.state.standardSearch.searchValue.length < 3) {
                this.setState({
                    errorStyle: true
                })

                return false;
            }
            else if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                return this.checkInceptionDateRange();
            }
           
            return true;
        }
    }

    checkInceptionDateRange = () => {
        if (this.state.standardSearch.INCEPTIONFROM && this.state.standardSearch.INCEPTIONTO) {
            if (new Date(this.state.standardSearch.INCEPTIONFROM).getTime() < new Date(this.state.standardSearch.INCEPTIONTO).getTime()) {
                return true;
            }
            else {
                this.setState({
                    datesRangeError: {
                        active: true,
                        message: "TO date cannot precede FROM date"
                    }
                })

                return false;
            }
        }

        this.setState({
            datesRangeError: {
                active: true,
                message: "Must include both FROM and TO Inception dates"
            }
        })
    
        return false;
    }

    handleFromDateInput = (value) => {
        this.setState({
            datesRangeError: {
                active: false, 
                message: null
            },
            standardSearch: {
                ...this.state.standardSearch,
                INCEPTIONFROM: value,
            }
        })
    }

    handleToDateInput = (value) => {
        this.setState({
            datesRangeError: {
                active: false, 
                message: null
            },
            standardSearch: {
                ...this.state.standardSearch,
                INCEPTIONTO: format(new Date(value), 'MM/dd/yyyy'),
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            standardSearch: {
                ...this.state.standardSearch, 
                searchValue: e.target.value
            },
            errorStyle: false
        });
    };

    handleKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.executeSearch();
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
            standardSearch: {
                searchValue: ''
            }
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
        });
    };

    handleShowAdvancedSearch = () => {
        this.handleAdjustPadding();
        if (!this.state.advancedSearchActive) {
            this.setState({advancedSearchActive: true})
        } else {
            this.setState({advancedSearchActive: false})
        }
    };

    render() {
        return (
            <>
                <Search
                    loading={this.props.loading}
                    errorStyle={this.state.errorStyle}
                    searchValue={this.state.standardSearch.searchValue}
                    handleChange={this.handleChange}
                    handleKeyPress={this.handleKeyPress}
                    executeSearch={this.executeSearch}
                    handleClearInput={this.handleClearInput}
                    handleHelperText={this.handleHelperText}
                    adjustPadding={this.state.adjustPadding}
                    handleAdjustPadding={this.handleAdjustPadding}
                    advancedSearchActive={this.state.advancedSearchActive}
                    handleShowAdvancedSearch={this.handleShowAdvancedSearch}
                    handleFromDateInput={this.handleFromDateInput}
                    handleToDateInput={this.handleToDateInput}
                    datesRangeError={this.state.datesRangeError}
                    standardSearch={this.state.standardSearch}
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
        error: state.affidavits.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAffidavits: (endpoint, token, data) => dispatch(getAffidavits(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Affidavits);
