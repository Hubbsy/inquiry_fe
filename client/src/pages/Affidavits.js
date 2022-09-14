import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { format, isBefore, isValid, isAfter, isEqual, add } from 'date-fns';

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
            message: null,
            id: null
        },
        errorStyle: false,
        serverError: false,
        adjustPadding: false,
        advancedSearchActive: false,
        showLicenseCol: false,
        windowHeight: window.innerHeight,
        clientHeight: document.body.clientHeight
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
                const data = this.mapAPIResponse(this.props.data.DATA);

                this.setState({
                    rows: data
                });
            }
        }
    }

    setWindowHeight = () => {
        this.setState({
            windowHeight: window.innerHeight,
            clientHeight: document.body.clientHeight
        })
    }

    handleAdjustPadding = (flag) => {
        if (this.state.windowHeight < this.state.clientHeight) {
            this.setState({
                adjustPadding: true
            })
        }
        else if (this.state.windowHeight >= this.state.clientHeight) {
            this.setState({
                adjustPadding: false
            })
        }
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
            "LICENSENO": true
        }

        return data.map((record) => {
            let mappedData = {};
            let transaction = record.PARTA_TRANSACTION;
            mappedData.companyDetails = this.setCompanyDetails(transaction);
            this.setState({
                showLicenseCol: this.props.data.SHOW_LICENSE_COLUMN
            })

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
            affidavitNo: transaction.AFFIDAVITNO,
            riskAddress: transaction.RISKADDRESS,
            city: transaction.RISKCITY,
            state: transaction.RISKSTATE,
            zip: transaction.RISKZIPCODE,
            company: `${transaction.COMPANY[0].COMPANYNUMBER} ${transaction.COMPANY[0].COMPANYNAME}`,
            coverage: transaction.COVERAGE,
            risk: transaction.RISK,
            batchView: transaction.BATCHLINKEDITVIEW,
            batchLink: transaction.BATCHLINK
        };
    }

    executeSearch = () => {
        const data = {
            COMBOSEARCH: this.state.advancedSearchActive ? "" : this.state.standardSearch.searchValue,
            AFFIDAVITNUMBER: this.state.advancedSearchActive ? this.state.advancedSearch.AFFIDAVITNUMBER : "",
            POLICYNUMBER: this.state.advancedSearchActive ? this.state.advancedSearch.POLICYNUMBER : "",
            INSUREDNAME: this.state.advancedSearchActive ? this.state.advancedSearch.INSUREDNAME : "",
            INCEPTIONFROM: isValid(this.state.standardSearch.INCEPTIONFROM) ? format(new Date(this.state.standardSearch.INCEPTIONFROM), "MM/dd/yyyy") : "",
            INCEPTIONTO: isValid(this.state.standardSearch.INCEPTIONTO) ? format(new Date(this.state.standardSearch.INCEPTIONTO), "MM/dd/yyyy") : "",
            CONTACTNAME: this.state.advancedSearchActive ? this.state.advancedSearch.CONTACTNAME : "",
            BROKERREFERENCE: this.state.advancedSearchActive ? this.state.advancedSearch.BROKERREFERENCE : "",
            BATCH: this.state.advancedSearchActive ? this.state.advancedSearch.BATCH : "",
            PREMIUMFROM: this.state.advancedSearchActive ? this.state.advancedSearch.PREMIUMFROM : "",
            PREMIUMTO: this.state.advancedSearchActive ? this.state.advancedSearch.PREMIUMTO : ""
        };

        if (this.checkValidSearchParams()) {
            this.props.getAffidavits(this.props.endpoint, window.localStorage.getItem("TOKEN") ? window.localStorage.getItem("TOKEN") : this.props.token, data);
        }
    };

    checkValidSearchParams = () => {
        let validSearch = true;

        if (!this.state.advancedSearchActive) {
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                if (this.state.datesRangeError.startDateError || this.state.datesRangeError.endDateError ) {
                    validSearch = false;
                }
                else {
                    validSearch = this.checkInceptionDateRange();
                }
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
        else if ((this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) && advancedSearchValid) {
            if (this.state.advancedSearch.PREMIUMFROM && 
                this.state.advancedSearch.PREMIUMTO && 
                (parseFloat(this.state.advancedSearch.PREMIUMFROM.replace(/,/g, "")) >= parseFloat(this.state.advancedSearch.PREMIUMTO.replace(/,/g, "")))) {
                    this.handleErrorMessages("premiumValid", null, "PREMIUMTO");
                    return false;
            }
            else if (!this.state.advancedSearch.PREMIUMFROM) {
                    this.handleErrorMessages("premiumRange", null, "PREMIUMFROM");
                    return false;
            }
            else if (!this.state.advancedSearch.PREMIUMTO) {
                this.handleErrorMessages("premiumRange", null, "PREMIUMTO");
                return false;
            }
            else {
                advancedSearchValid = true;
            }
        }

        if (advancedSearchValid) {
            let blankInputs = 0;
            
            for (let control in this.state.advancedSearch) {
                if (this.state.advancedSearch[control].length > 0 && this.state.advancedSearch[control].length < 3) {
                    this.handleErrorMessages("advancedSearch", null, control);
                    return false;
                }
                else if (
                    this.state.advancedSearch[control].length === 0) {
                    blankInputs++;
                }
            }

            if (blankInputs === 8 && (!this.state.standardSearch.INCEPTIONFROM || !this.state.standardSearch.INCEPTIONTO)) {
                this.handleErrorMessages("advancedSearch");
                return false;
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

    handleErrorMessages = (type, pos = null, inputId = null) => {
        const errorMessages = {
            standardSearch: "Must be at least 3 characters",
            advancedSearch: {
                group: "At least one input is required",
                single: "3 or more characters is required" 
            } ,
            datesEndRange: "Date cannot be before start date",
            datesEndValid: "Must enter a valid end date",
            datesStartValid: "Must enter a valid start date",
            datesStartRange: "Date cannot be after end date",
            datesNotEqual: "Dates cannot be the same",
            premiumRange: "Must include both Premium amounts",
            premiumValid: "Premium cannot be greater than start amount"
        }

        let newState = null;
        if (type === "standardSearch") {
            newState = {
                errorStyle: true
            }
        }
        else if (type === "advancedSearch") {
            let errorMessage = inputId ? errorMessages.advancedSearch.single : errorMessages.advancedSearch.group;
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessage,
                    id: inputId
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
            else if (pos === "startRange") {
                newState = {
                    datesRangeError: {
                        startDateError: true,
                        message: errorMessages.datesStartRange
                    }
                }
            }
            else if (pos === "notEqual") {
                newState = {
                    datesRangeError: {
                        endDateError: true,
                        message: errorMessages.datesNotEqual
                    }
                }
            }
        }
        else if (type === "premiumRange") {
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessages.premiumRange,
                    id: inputId
                },
            }
        }
        else if (type === "premiumValid") {
            newState = {
                advancedInputsError: {
                    active: true, 
                    message: errorMessages.premiumValid,
                    id: inputId
                },
            }
        }

        return this.setState(newState);
    }

    setStartDate = (e) => {
        let endDate = null;
        if (e === null) {
            return this.setState({ 
                standardSearch: {
                    ...this.state.standardSearch, 
                    INCEPTIONFROM: null,
                    INCEPTIONTO: null
                },
                datesRangeError: {
                    endDateError: false,
                    startDateError: false,
                    message: null
                }
             });
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (this.state.standardSearch.INCEPTIONTO !== null && isAfter(e, this.state.standardSearch.INCEPTIONTO)) {
                    endDate = this.state.standardSearch.INCEPTIONTO;
                    return this.handleErrorMessages("dates", "startRange");
                } else if (this.state.standardSearch.INCEPTIONTO !== null && isEqual(e, this.state.standardSearch.INCEPTIONTO)) {
                    endDate = this.state.standardSearch.INCEPTIONTO;
                    return this.handleErrorMessages("dates", "notEqual");
                } else if (this.state.standardSearch.INCEPTIONTO === null) {
                    endDate = add(e, { years: 1 });
                } else {
                    endDate = this.state.standardSearch.INCEPTIONTO; 
                }

                return this.setState({ 
                    standardSearch: {
                        ...this.state.standardSearch, 
                        INCEPTIONFROM: e,
                        INCEPTIONTO: endDate
                    }, 
                    datesRangeError: {
                        endDateError: false,
                        startDateError: false,
                        message: null
                    },
                    advancedInputsError: {
                        active: false, 
                        message: null,
                        id: null
                    },
                 });
            } else {
                return this.handleErrorMessages("dates", "startValid");
            }
        }
    };

    setEndDate = (e) => {
        if (e === null) {
            return this.setState({ 
                standardSearch: {
                    ...this.state.standardSearch, 
                    INCEPTIONFROM: null,
                    INCEPTIONTO: null
                },
                datesRangeError: {
                    endDateError: false,
                    startDateError: false,
                    message: null
                }
             });
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (isAfter(this.state.standardSearch.INCEPTIONFROM, e)) {
                    this.handleErrorMessages("dates", "endRange");
                }
                else if (isEqual(this.state.standardSearch.INCEPTIONFROM, e)) {
                    this.handleErrorMessages("dates", "notEqual");
                }
                else {
                    this.setState({ 
                        standardSearch: {
                            ...this.state.standardSearch, 
                            INCEPTIONTO: e,
                        }, 
                        datesRangeError: {
                            endDateError: false,
                            startDateError: false,
                            message: null
                        },
                        advancedInputsError: {
                            active: false, 
                            message: null,
                            id: null
                        },
                        
                    });
                }
            } else {
                return this.handleErrorMessages("dates", "endValid")
            }
        }
    };

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
            this.handleErrorMessages("advancedSearch", null, e.target.name)
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

    handleCloseGeneralError = () => {
        this.setState({
            advancedInputsError: {
                active: false, 
                message: null,
                id: null
            } 
        })
    }

    toggleAdvancedSearchPanel = () => {
        this.handleAdjustPadding();
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
                advancedSearchActive: false
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

    clearAdvancedSearchInputs = () => {
        this.setState({
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
                    advancedSearchActive={this.state.advancedSearchActive}
                    toggleAdvancedSearchPanel={this.toggleAdvancedSearchPanel}
                    handleFromDateInput={this.setStartDate}
                    handleToDateInput={this.setEndDate}
                    datesRangeError={this.state.datesRangeError}
                    standardSearch={this.state.standardSearch}
                    advancedSearch={this.state.advancedSearch}
                    handleAdvancedSearchInputs={this.handleAdvancedSearchInputs}
                    handleAdvancedKeyPress={this.handleAdvancedKeyPress}
                    advancedInputsError={this.state.advancedInputsError}
                    handleCloseGeneralError={this.handleCloseGeneralError}
                    clearAdvancedSearchInputs={this.clearAdvancedSearchInputs}
                />
                <Table
                    loading={this.props.loading}
                    rows={this.state.rows}
                    adjustPadding={this.state.adjustPadding}
                    showLicenseCol={this.state.showLicenseCol}
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
