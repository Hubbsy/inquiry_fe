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
        datesRangeError: {
            startDateError: false,
            endDateError: false,
            message: null
        },
        advancedInputsError: {
            active: false, 
            message: null
        },
        errorStyle: false,
        serverError: false,
        adjustPadding: false,
        advancedSearchActive: false,
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
                console.log(data)

                this.setState({
                    rows: data
                });
            }
        }
        if (window.innerHeight < document.body.clientHeight && !this.state.adjustPadding) {
            this.handleAdjustPadding(true);
        }
        else if (window.innerHeight > document.body.clientHeight && this.state.adjustPadding) {
            this.handleAdjustPadding(false);
        }
        
    }

    handleAdjustPadding = (flag) => {
        this.setState({
            adjustPadding: flag
        })
    };

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
            let mappedData = {};
            let transaction = record.PARTA_TRANSACTION;
            mappedData.companyDetails = this.setCompanyDetails(transaction)

            for (const key in transaction) {
                if (tableFields.hasOwnProperty(key)) {
                    if (transaction[key] === null || !transaction[key] || transaction[key].trim().length === 0) {
                        mappedData[key] = "-";
                    }
                    else {
                        mappedData[key] = transaction[key];
                    }
                }
                else if (key === "CHILD_TRANSACTION" && !isEmpty(transaction[key][0])) {
                    mappedData.expandable = true;
                    mappedData.CHILDTRANSACTIONS = transaction.CHILD_TRANSACTION;
                }
            }

            return mappedData;
        });
    }

    setCompanyDetails(transaction) {
        return {
            address: transaction.RISKADDRESS,
            city: transaction.RISKCITY,
            state: transaction.RISKSTATE,
            zip: transaction.RISKZIPCODE,
            company: `${transaction.COMPANY[0].COMPANYNUMBER} ${transaction.COMPANY.COMPANYNAME}`,
            coverage: transaction.COVERAGE,
            risk: transaction.RISK
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

    checkValidSearchParams = () => {
        let validSearch = true;

        if (!this.state.advancedSearchActive) {
            
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                validSearch = this.checkInceptionDateRange();
            }
            else if (this.state.standardSearch.searchValue.length < 3) {
                this.handleErrorMessages("standardSearch");
                validSearch = false;
            }
        }
        else {
            validSearch = this.validateAdvancedSearch();
        }

        this.setState({validSearch});

        return validSearch;
    }

    validateAdvancedSearch = () => {
        let advancedSearchValid = true;

        if ((this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO)) {
            advancedSearchValid = this.checkInceptionDateRange();
        }
        if ((this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) && advancedSearchValid) {
            if (this.state.advancedSearch.PREMIUMFROM && 
                this.state.advancedSearch.PREMIUMTO && 
                (parseFloat(this.state.advancedSearch.PREMIUMFROM.replace(/,/g, "")) <= parseFloat(this.state.advancedSearch.PREMIUMTO.replace(/,/g, "")))) {
            }
            else if (
                !this.state.advancedSearch.PREMIUMFROM || 
                !this.state.advancedSearch.PREMIUMTO) {
                    advancedSearchValid = false;
                    this.handleErrorMessages("premiumRange");
            }
            else {
                advancedSearchValid = false;
                this.handleErrorMessages("premiumValid");
            }
        }
        else if (advancedSearchValid) {
            for (let control in this.state.advancedSearch) {
                if (this.state.advancedSearch[control].length && this.state.advancedSearch[control].length >= 3) {
                    break;
                }
                else {
                    advancedSearchValid = false;
                    this.handleErrorMessages("advancedSearch");
                }
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
                this.handleErrorMessages("dates", "endRange");
                return false;
            }
        }
        if (!isValid(this.state.standardSearch.INCEPTIONFROM)) {
            this.handleErrorMessages("dates", "startValid");
        }
        else {
            this.handleErrorMessages("dates", "endValid");
        }

        return false;
    }

    handleErrorMessages = (type, pos = null) => {
        const errorMessages = {
            standardSearch: "Must be at least 3 characters",
            advancedSearch: "At least 1 search input with 3 or more characters is required",
            datesEndRange: "Start date cannot precede End date",
            datesEndValid: "Must enter a valid end date",
            datesStartValid: "Must enter a valid start date",
            premiumRange: "Must include both Premium From and To amounts",
            premiumValid: "Premium From amount cannot be greater than To amount"
        }

        let newState = null;
        if (type === "standardSearch") {
            newState = {
                errorStyle: true
            }
        }
        else if (type === "advancedSearch") {
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessages.advancedSearch
                },
            }
        }
        else if (type === "dates") {
            if (pos === "endRange") {
                newState = {
                    datesRangeError: {
                        endDateError: true,
                        message: errorMessages.datesEndRange
                    }
                }
            }
            else if (pos === "endValid") {
                newState = {
                    datesRangeError: {
                        endDateError: true,
                        message: errorMessages.datesEndValid
                    }
                }
            }
            else if (pos === "startValid") {
                newState = {
                    datesRangeError: {
                        startDateError: true,
                        message: errorMessages.datesStartValid
                    }
                }
            }
        }
        else if (type === "premiumRange") {
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessages.premiumRange
                },
            }
        }
        else if (type === "premiumValid") {
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessages.premiumValid
                },
            }
        }

        return this.setState(newState);
    }

    handleFromDateInput = (value) => {
        this.setState({
            errorStyle: false,
            datesRangeError: {
                active: false, 
                message: null
            },
            standardSearch: {
                ...this.state.standardSearch,
                INCEPTIONFROM: value,
            },
            advancedInputsError: {
                active: false,
                message: ""
            } 
        })
    }

    handleToDateInput = (value) => {
        this.setState({
            errorStyle: false,
            datesRangeError: {
                active: false, 
                message: null
            },
            standardSearch: {
                ...this.state.standardSearch,
                INCEPTIONTO: value,
            },
            advancedInputsError: {
                active: false,
                message: ""
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
            this.handleErrorMessages("standardSearch");
        }
    };

    handleAdvancedKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.executeSearch();
        } else if (e.charCode === 13) {
            this.handleErrorMessages("advancedSearch")
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

    toggleAdvancedSearchPanel = () => {
        
        if (!this.state.advancedSearchActive) {
            this.setState({
                advancedSearchActive: true, 
                errorStyle: false, 
                standardSearch: {
                    ...this.state.standardSearch, 
                    searchValue: ""
                }
            })
        } 
        else {
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
                },
                advancedInputsError: {
                    active: false,
                    message: ""
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
                    toggleAdvancedSearchPanel={this.toggleAdvancedSearchPanel}
                    handleFromDateInput={this.handleFromDateInput}
                    handleToDateInput={this.handleToDateInput}
                    datesRangeError={this.state.datesRangeError}
                    standardSearch={this.state.standardSearch}
                    advancedSearch={this.state.advancedSearch}
                    handleAdvancedSearchInputs={this.handleAdvancedSearchInputs}
                    handleAdvancedKeyPress={this.handleAdvancedKeyPress}
                    advancedInputsError={this.state.advancedInputsError}
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
