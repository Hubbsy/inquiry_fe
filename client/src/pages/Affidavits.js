import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { format, isBefore, isValid, isAfter, isEqual } from 'date-fns';

class Affidavits extends React.Component {
    state = {
        rows: [],
        standardSearch: {
            searchValue: '',
            INCEPTIONFROM: null,
            INCEPTIONTO: null
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
        applicationErrors: {
            active: false, 
            type: null, 
            inputId: null, 
            multipleInputs: [],
            message: "",
            el: null
        },
        adjustPadding: false,
        advancedSearchActive: false,
        showLicenseCol: false,
        windowHeight: window.innerHeight,
        clientHeight: document.body.clientHeight
    };

    componentDidUpdate(prevProps) {
        console.log('prev Props:', prevProps);
        console.log('props:', this.props);
        console.log('state', this.state);

        if (prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({
                applicationErrors: {
                    ...this.state.applicationErrors,
                    active: true, 
                    type: "SERVER",
                }
            })
        }
        if (
            JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data) &&
            !isEmpty(this.props.data)
        ) {
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
        });
    };

    handleAdjustPadding = () => {
        if (this.state.windowHeight < this.state.clientHeight) {
            this.setState({
                adjustPadding: true
            });
        } else if (this.state.windowHeight >= this.state.clientHeight) {
            this.setState({
                adjustPadding: false
            });
        }
    };

    floatToDollarsConverter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    mapAPIResponse = (data) => {
        return data.map((record) => {
            let transaction = record.PARTA_TRANSACTION;
            this.setState({
                showLicenseCol: this.props.data.SHOW_LICENSE_COLUMN
            });

            return {
                AFFIDAVITNO: transaction.AFFIDAVITNO.trim() ? transaction.AFFIDAVITNO.trim() : '-',
                POLICYNO: transaction.POLICYNO.trim() ? transaction.POLICYNO.trim() : '-',
                RISKINSUREDNAME: transaction.RISKINSUREDNAME.trim()
                    ? transaction.RISKINSUREDNAME.trim()
                    : '-',
                TRANSACTIONTYPE: transaction.TRANSACTIONTYPE.trim()
                    ? transaction.TRANSACTIONTYPE.trim()
                    : '-',
                AMOUNT: this.floatToDollarsConverter.format(transaction.AMOUNT),
                EFFECTIVEDATE: transaction.EFFECTIVEDATE
                    ? format(new Date(transaction.EFFECTIVEDATE), 'MM/dd/yyyy')
                    : '-',
                EXPIRATIONDATE: transaction.EXPIRATIONDATE
                    ? format(new Date(transaction.EXPIRATIONDATE), 'MM/dd/yyyy')
                    : '-',
                BATCHNO: transaction.BATCHNO ? transaction.BATCHNO : '-',
                RECEIVEDATE: transaction.RECEIVEDATE
                    ? format(new Date(transaction.RECEIVEDATE), 'MM/dd/yyyy')
                    : '-',
                PROCESSEDSTATE: transaction.PROCESSEDSTATE.trim()
                    ? transaction.PROCESSEDSTATE.trim()
                    : '-',
                LICENSENO: transaction.LICENSENO.substring(transaction.LICENSENO.indexOf('-') + 1),
                companyDetails: this.setCompanyDetails(transaction),
                CHILDTRANSACTIONS:
                    transaction.CHILD_TRANSACTION && !isEmpty(transaction['CHILD_TRANSACTION'][0])
                        ? transaction.CHILD_TRANSACTION
                        : null,
                expandable:
                    transaction.CHILD_TRANSACTION && !isEmpty(transaction['CHILD_TRANSACTION'][0])
                        ? true
                        : false
            };
        });
    };

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
            COMBOSEARCH: this.state.advancedSearchActive
                ? ''
                : this.state.standardSearch.searchValue,
            AFFIDAVITNUMBER: this.state.advancedSearchActive
                ? this.state.advancedSearch.AFFIDAVITNUMBER
                : '',
            POLICYNUMBER: this.state.advancedSearchActive
                ? this.state.advancedSearch.POLICYNUMBER
                : '',
            INSUREDNAME: this.state.advancedSearchActive
                ? this.state.advancedSearch.INSUREDNAME
                : '',
            INCEPTIONFROM: isValid(this.state.standardSearch.INCEPTIONFROM)
                ? format(new Date(this.state.standardSearch.INCEPTIONFROM), 'MM/dd/yyyy')
                : '',
            INCEPTIONTO: isValid(this.state.standardSearch.INCEPTIONTO)
                ? format(new Date(this.state.standardSearch.INCEPTIONTO), 'MM/dd/yyyy')
                : '',
            CONTACTNAME: this.state.advancedSearchActive
                ? this.state.advancedSearch.CONTACTNAME
                : '',
            BROKERREFERENCE: this.state.advancedSearchActive
                ? this.state.advancedSearch.BROKERREFERENCE
                : '',
            BATCH: this.state.advancedSearchActive ? this.state.advancedSearch.BATCH : '',
            PREMIUMFROM: this.state.advancedSearchActive
                ? this.state.advancedSearch.PREMIUMFROM
                : '',
            PREMIUMTO: this.state.advancedSearchActive ? this.state.advancedSearch.PREMIUMTO : ''
        };

        if (this.checkValidSearchParams()) {
            this.props.getAffidavits(
                this.props.endpoint,
                window.localStorage.getItem('TOKEN')
                    ? window.localStorage.getItem('TOKEN')
                    : this.props.token,
                data
            );
        }
    };

    checkValidSearchParams = () => {
        let validSearch = true;

        if (!this.state.advancedSearchActive) {
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                if (
                    this.state.applicationErrors.active
                ) {
                    validSearch = false;
                } else {
                    validSearch = this.checkInceptionDateRange();
                }
            } else if (this.state.standardSearch.searchValue.length < 3) {
                this.handleErrorMessages('STANDARD');
                validSearch = false;
            }
        } else {
            validSearch = this.validateAdvancedSearch();
        }

        this.setState({ validSearch });

        return validSearch;
    };

    validateAdvancedSearch = () => {
        let advancedSearchValid = true;

        if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
            advancedSearchValid = this.checkInceptionDateRange();
        } else if (
            (this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) &&
            advancedSearchValid
        ) {
            if (
                this.state.advancedSearch.PREMIUMFROM &&
                this.state.advancedSearch.PREMIUMTO &&
                parseFloat(this.state.advancedSearch.PREMIUMFROM.replace(/,/g, '')) >=
                    parseFloat(this.state.advancedSearch.PREMIUMTO.replace(/,/g, ''))
            ) {
                this.handleErrorMessages("PREMIUMS", {pos: "start", type: "range"});
                return false;
            } 
            else if (!this.state.advancedSearch.PREMIUMFROM) {
                this.handleErrorMessages("PREMIUMS", {pos: "start", type: "valid"});
                return false;
            } 
            else if (!this.state.advancedSearch.PREMIUMTO) {
                this.handleErrorMessages("PREMIUMS", {pos: "end", type: "valid"});
                return false;
            } 
            else {
                advancedSearchValid = true;
            }
        }

        if (advancedSearchValid) {
            let blankInputs = 0;
            let errorInputs = [];

            for (let control in this.state.advancedSearch) {
                console.log(control)
                if (
                    this.state.advancedSearch[control].length > 0 &&
                    this.state.advancedSearch[control].length < 3 &&
                    control !== "PREMIUMFROM" &&
                    control !== "PREMIUMTO"
                ) {
                    this.handleErrorMessages("ADVANCED", {pos: null, type: "single"}, control);
                    errorInputs.push(control);
                    advancedSearchValid = false;
                } else if (this.state.advancedSearch[control].length === 0) {
                    blankInputs++;
                }
            }

            if (errorInputs.length > 0) {
                this.setState({
                    applicationErrors: {
                        ...this.state.applicationErrors,
                        active: true,
                        message: "Must be at least 3 characters",
                        multipleInputs: errorInputs
                    }
                })
            }

            if (
                blankInputs === 8 &&
                (!this.state.standardSearch.INCEPTIONFROM || !this.state.standardSearch.INCEPTIONTO)
            ) {
                this.handleErrorMessages("ADVANCED", {pos: null, type: "group"});
                return false;
            }
        }

        return advancedSearchValid;
    };

    checkInceptionDateRange = () => {
        if (!isValid(this.state.standardSearch.INCEPTIONFROM)) {
            this.handleErrorMessages('DATES', {type: "valid", pos: "start"});
        } 
        else if (!isValid(this.state.standardSearch.INCEPTIONTO)) {
            this.handleErrorMessages('DATES', {type: "valid", pos: "end"});
        }
        else {
            if (
                isBefore(
                    new Date(this.state.standardSearch.INCEPTIONFROM),
                    new Date(this.state.standardSearch.INCEPTIONTO)
                ) || 
                isEqual(
                    new Date(this.state.standardSearch.INCEPTIONFROM),
                    new Date(this.state.standardSearch.INCEPTIONTO)
                )
            ) {
                return true;
            } 
            else {
                this.handleErrorMessages('DATES', {type: "range", pos: "end"});
                return false;
            }
        }
        
        return false;
    };

    handleErrorMessages = (type, el = null, inputId = null) => {
        console.log("!!!FIRING ERROR!!!", type)
        const errorTypes = {
            "SERVER": "SERVER", 
            "ADVANCED": {
                name: "ADVANCED",
                messages: {
                    single: "Must be at least 3 characters",
                    group: "At least one input is required"
                }
            },
            "STANDARD": {
                name: "STANDARD",
                message: "Must be at least 3 characters" 
            }, 
            "DATES": {
                name: "DATES",
                messages: {
                    valid: {
                        start: "Must enter a valid start date",
                        end: "Must enter a valid end date"
                    },
                    range: {
                        start: "Date cannot be after end date",
                        end: "Date cannot be before start date"
                    }
                } 
            },
            "PREMIUMS": {
                name: "PREMIUMS",
                messages: {
                    valid: {
                        start: "Must enter a valid start amount",
                        end: "Must enter a valid end amount"
                    },
                    range: {
                        start: "Start amount cannot be greater than end amount",
                    }
                } 
            } 
        }

        let currentErrorMessage = "";
        if (errorTypes.hasOwnProperty(type)) {
            if (type === "STANDARD") {
                currentErrorMessage = errorTypes[type].message;
            }
            else if (type === "DATES") {
                currentErrorMessage = errorTypes[type].messages[el.type][el.pos];
            }
            else if (type === "PREMIUMS") {
                currentErrorMessage = errorTypes[type].messages[el.type][el.pos];
            }
            else if (type === "ADVANCED") {
                currentErrorMessage = errorTypes[type].messages[el.type];
            }
        } 

        this.setState({
            applicationErrors: {
                active: true, 
                type,
                inputId,
                el,
                message: currentErrorMessage,
                multipleInputs: []
            }
        })
    };

    setStartDate = (e) => {
        let endDate = null;
        if (e === null) {
            return this.setState({
                standardSearch: {
                    ...this.state.standardSearch,
                    INCEPTIONFROM: null,
                    INCEPTIONTO: null
                },
                
            });
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (
                    this.state.standardSearch.INCEPTIONTO !== null &&
                    isAfter(e, this.state.standardSearch.INCEPTIONTO)
                ) {
                    endDate = this.state.standardSearch.INCEPTIONTO;
                    this.handleErrorMessages('DATES', {type: "range", pos: "start"});
                } else if (this.state.standardSearch.INCEPTIONTO === null) {
                    endDate = e;
                } else {
                    endDate = this.state.standardSearch.INCEPTIONTO;
                }

                return this.setState({
                    standardSearch: {
                        ...this.state.standardSearch,
                        INCEPTIONFROM: e,
                        INCEPTIONTO: endDate
                    },
                    applicationErrors: {
                        active: false, 
                        type: null, 
                        inputId: null, 
                        multipleInputs: [],
                        message: "",
                        el: null
                    }
                });
            } else {
                this.handleErrorMessages('DATES', {type: "valid", pos: "start"});
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
                applicationErrors: {
                    active: false, 
                    type: null, 
                    inputId: null, 
                    message: "",
                    multipleInputs: [],
                    el: null
                }
            });
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (isAfter(this.state.standardSearch.INCEPTIONFROM, e)) {
                    this.handleErrorMessages('DATES', {type: "range", pos: "end"});
                } else {
                    this.setState({
                        standardSearch: {
                            ...this.state.standardSearch,
                            INCEPTIONTO: e
                        },
                        applicationErrors: {
                            active: false, 
                            type: null, 
                            inputId: null, 
                            message: "",
                            multipleInputs: [],
                            el: null
                        }
                    });
                }
            } else {
                this.handleErrorMessages('DATES', {type: "valid", pos: "end"});
            }
        }
    };

    handleChange = (e) => {
        this.setState({
            standardSearch: {
                ...this.state.standardSearch,
                searchValue: e.target.value
            },
            applicationErrors: {
                active: false, 
                type: null, 
                inputId: null, 
                multipleInputs: [],
                message: "",
                el: null
            }
        });
    };

    handleKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.executeSearch();
        } else if (e.charCode === 13) {
            this.handleErrorMessages('STANDARD');
        }
    };

    handleAdvancedKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.executeSearch();
        } else if (e.charCode === 13) {
            this.handleErrorMessages("ADVANCED", {pos: null, type: "single"}, e.target.name);
        }
    };

    handleClose = () => {
        this.setState({
            applicationErrors: {
                active: false, 
                type: null, 
                inputId: null, 
                multipleInputs: [],
                message: "",
                el: null
            }
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
            applicationErrors: {
                active: false, 
                type: null, 
                inputId: null, 
                multipleInputs: [],
                message: "",
                el: null
            }
        });
    };

    handleCloseGeneralError = () => {
        this.setState({
            applicationErrors: {
                active: false, 
                type: null, 
                inputId: null, 
                multipleInputs: [],
                message: "",
                el: null
            }
        });
    };

    toggleAdvancedSearchPanel = () => {
        this.handleAdjustPadding();
        if (!this.state.advancedSearchActive) {
            this.setState({
                advancedSearchActive: true,
                applicationErrors: {
                    active: false, 
                    type: null, 
                    inputId: null, 
                    multipleInputs: [],
                    message: "",
                    el: null
                },
                standardSearch: {
                    ...this.state.standardSearch,
                    searchValue: ''
                }
            });
        } else {
            this.setState({
                advancedSearchActive: false
            });
        }
    };

    handleAdvancedSearchInputs = (e) => {
        if (this.state.advancedSearch.hasOwnProperty(e.target.name)) {
            this.setState({
                advancedSearch: {
                    ...this.state.advancedSearch,
                    [e.target.name]: e.target.value
                },
                applicationErrors: {
                    active: false, 
                    type: null, 
                    inputId: null, 
                    multipleInputs: [],
                    message: "",
                    el: null
                }
            });
        }
    };

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
            },
            standardSearch: {
                ...this.state.standardSearch,
                INCEPTIONFROM: null,
                INCEPTIONTO: null
            }
        });
    };

    render() {
        return (
            <>
                <Search
                    loading={this.props.loading}
                    applicationErrors={this.state.applicationErrors}
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
                    open={this.state.applicationErrors.active && this.state.applicationErrors.type === "SERVER"}
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
