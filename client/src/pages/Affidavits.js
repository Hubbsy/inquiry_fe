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

                if (data.length > 8) {
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
        console.log(data)

        if (this.checkValidSearchParams()) {
            this.props.getAffidavits(this.props.endpoint, window.localStorage.getItem("TOKEN") ? window.localStorage.getItem("TOKEN") : this.props.token, data);
        }
    };

    //  WIP
    checkValidSearchParams = () => {

        if (!this.state.advancedSearchActive) {
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                this.checkInceptionDateRange();
            }
            else if (this.state.standardSearch.searchValue.length < 3) {
                this.setState({
                    errorStyle: true
                })

                return false;
            }
        }
        else {
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                this.checkInceptionDateRange();
            }
            return this.checkAdvancedSearchValid();
        }

        return true;
    }

    checkAdvancedSearchValid = () => {
        let advancedSearchValid = false;

        for (let control in this.state.advancedSearch) {
            if (this.state.advancedSearch[control].length && this.state.advancedSearch[control].length >= 3) {
                advancedSearchValid = true;
                break;
            }
        }

        // Validate Premium To/From range
        if (this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) {
            if (this.state.advancedSearch.PREMIUMFROM && 
                this.state.advancedSearch.PREMIUMTO && 
                (parseFloat(this.state.advancedSearch.PREMIUMFROM.replace(/,/g, "")) <= parseFloat(this.state.advancedSearch.PREMIUMTO.replace(/,/g, "")))) {
                advancedSearchValid = true;
            }
            else if (
                !this.state.advancedSearch.PREMIUMFROM || 
                !this.state.advancedSearch.PREMIUMTO) {
                    advancedSearchValid = false;
                    this.setState({
                        advancedInputsError: {
                            active: true, 
                            message: "Must include both Premium From and To amounts"
                        },
                    })  
            }
            else {
                advancedSearchValid = false;
                this.setState({
                    advancedInputsError: {
                        active: true, 
                        message: "Premium From amount cannot be greater than To amount"
                    },
                })
            }
        }
        else if (!advancedSearchValid) {
            this.setState({
                advancedInputsError: {
                    active: true, 
                    message: "At least 1 search input with 3 or more characters is required"
                },
            })
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
                        endDateError: true,
                        message: "Start date cannot precede End date"
                    }
                })

                return false;
            }
        }
        
        if (!isValid(this.state.standardSearch.INCEPTIONFROM)) {
            this.setState({
                datesRangeError: {
                    startDateError: true,
                    message: "Must enter a valid start date"
                }
            })
        }
        else {
            this.setState({
                datesRangeError: {
                    endDateError: true,
                    message: "Must enter a valid end date"
                }
            })
        }

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

    handleAdvancedKeyPress = (e) => {
        if (e.charCode === 13 && e.target.value.length >= 3) {
            this.executeSearch();
        } else if (e.charCode === 13) {
            this.setState({
                advancedInputsError: {
                    error: true, 
                    message: "Must be at least 3 characters"
                }
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
            this.handleAdjustPadding(true)
            this.setState({advancedSearchActive: true, errorStyle: false, standardSearch: {...this.state.standardSearch, searchValue: ""}})
        } 
        else {
            if (this.state.rows.length <= 8) {
                this.handleAdjustPadding(false);
            }
            
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
                    handleShowAdvancedSearch={this.handleShowAdvancedSearch}
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
