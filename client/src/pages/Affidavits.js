import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { format, isBefore, isValid } from 'date-fns';

class Affidavits extends React.Component {
    state = {
        rows: [],
        standardSearch: {
            searchValue: '',
            INCEPTIONFROM: null,
            INCEPTIONTO: null,
        },
        advancedSearch: {
            AFFIDAVITNUMBER: '',
            POLICYNUMBER: '',
            INSUREDNAME: '',
            CONTACTNAME: '',
            BROKERREFERENCE: '',
            BATCH: '',
            PREMIUMFROM: '',
            PREMIUMTO: ''
        },
        errorStyle: false,
        datesRangeError: {
            active: false, 
            message: null
        },
        serverError: false,
        errorMessage: '',
        adjustPadding: false,
        advancedSearchActive: false
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
                console.log("DATA RES", this.props.data.DATA);
                const data = this.mapAPIResponse(this.props.data.DATA);
                if (data.length) {
                    this.handleAdjustPadding(true);
                }

                this.setState({
                    rows: data
                });
            }
        }
    }

    mapAPIResponse = (data) => {
        const tableFields = {
            "AFFIDAVITNO":true,
            "POLICYNO":true,
            "RISKINSUREDNAME":true,
            "TRANSACTIONTYPE":true,
            "AMOUNT":true,
            "EFFECTIVEDATE":true,
            "EXPIRATIONDATE":true,
            "BATCHNO":true,
            "RECEIVEDATE":true,
            "PROCESSEDSTATE":true,
        }

        return data.map((record) => {
            let transaction = record.PARTA_TRANSACTION;
            let mappedData = {};
            for (const key in transaction) {
                if (tableFields.hasOwnProperty(key)) {
                    if (transaction[key] === null || !transaction[key]) {
                        mappedData[key] = "N/A";
                    }
                    else {
                        mappedData[key] = transaction[key];
                    }
                }
            }

            return mappedData;
        });
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
            COMBOSEARCH: this.state.advancedSearchActive ? "" : this.state.standardSearch.searchValue,
            AFFIDAVITNUMBER: this.state.advancedSearch.AFFIDAVITNUMBER,
            POLICYNUMBER: this.state.advancedSearch.POLICYNUMBER,
            INSUREDNAME: this.state.advancedSearch.INSUREDNAME,
            INCEPTIONFROM: isValid(this.state.standardSearch.INCEPTIONFROM) ? format(new Date(this.state.standardSearch.INCEPTIONFROM), "MM/dd/yyyy") : "",
            INCEPTIONTO: isValid(this.state.standardSearch.INCEPTIONTO) ? format(new Date(this.state.standardSearch.INCEPTIONTO), "MM/dd/yyyy") : "",
            CONTACTNAME: this.state.advancedSearch.CONTACTNAME,
            BROKERREFERENCE: this.state.advancedSearch.BROKERREFERENCE,
            BATCH: this.state.advancedSearch.BATCH,
            PREMIUMFROM: this.state.advancedSearch.PREMIUMFROM,
            PREMIUMTO: this.state.advancedSearch.PREMIUMTO
        };

        if (this.checkValidSearchParams()) {
            this.props.getAffidavits(this.props.endpoint, window.localStorage.getItem("TOKEN") ? window.localStorage.getItem("TOKEN") : this.props.token, data);
        }
    };

    //  WIP
    checkValidSearchParams = () => {

        if (!this.state.advancedSearchActive) {
            if (this.state.standardSearch.searchValue.length < 3) {
                this.setState({
                    errorStyle: true
                })

                return false;
            }
        }
        else {
            return this.checkAdvancedSearchValid();
        }

        if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
            return this.checkInceptionDateRange();
        }

        return true;
    }

    checkAdvancedSearchValid = () => {
        let advancedSearchValid = false;

        for (let control in this.state.advancedSearch) {
            if (this.state.advancedSearch[control].length >= 3) {
                advancedSearchValid = true;
                break;
            }
        }

        // Validate Premium To/From range
        if (this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) {
            if (this.state.advancedSearch.PREMIUMFROM && this.state.advancedSearch.PREMIUMTO && 
                (this.state.advancedSearch.PREMIUMFROM <= this.state.advancedSearch.PREMIUMTO)) {
                advancedSearchValid = true;
            }
            else {
                advancedSearchValid = false;
            }
        }

        return advancedSearchValid;
    }

    checkInceptionDateRange = () => {
        if (isValid(this.state.standardSearch.INCEPTIONFROM) && isValid(this.state.standardSearch.INCEPTIONTO)) {
            if (isBefore(new Date(this.state.standardSearch.INCEPTIONFROM), new Date(this.state.standardSearch.INCEPTIONTO))) {
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
                INCEPTIONTO: value,
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

    handleAdjustPadding = (flag) => {
        this.setState({
            adjustPadding: flag
        });
    };

    handleShowAdvancedSearch = () => {
        
        if (!this.state.advancedSearchActive) {
            this.handleAdjustPadding(true);
            this.setState({advancedSearchActive: true})
        } 
        else {
            // this.handleAdjustPadding(false);
            this.setState({
                advancedSearchActive: false, 
                advancedSearch: {
                    AFFIDAVITNUMBER: '',
                    POLICYNUMBER: '',
                    INSUREDNAME: '',
                    CONTACTNAME: '',
                    BROKERREFERENCE: '',
                    BATCH: '',
                    PREMIUMFROM: '',
                    PREMIUMTO: ''
                }
            })
        }
    };

    handleAdvancedSearchInputs = (e) => {
        if (this.state.advancedSearch.hasOwnProperty(e.target.name)) {
            this.setState({
                advancedSearch: {
                    ...this.state.advancedSearch,
                    [e.target.name]: e.target.value
                } 
            })
        }
    }

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
                    advancedSearch={this.state.advancedSearch}
                    handleAdvancedSearchInputs={this.handleAdvancedSearchInputs}
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
