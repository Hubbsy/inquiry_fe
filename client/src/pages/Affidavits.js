import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar, ErrorBoundary } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { format, isBefore, isValid, isAfter, isEqual } from 'date-fns';
import { Fab, Grid, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
            multipleInputs: [],
            message: '',
            el: null
        },
        adjustPadding: false,
        advancedSearchActive: false,
        showLicenseCol: false,
        scrollBarActive: false,
        windowScroll: false,
        windowDimensions: {
            clientHeight: null,
            windowHeight: null
        }
    };

    componentDidMount() {
        // detect scrollbar active
        this.handleDocScroll();
        window.addEventListener('resize', this.handleDocScroll);
    }

    setDocScroll(activeScroll) {
        let scrollBarActive = this.state.scrollBarActive;
        scrollBarActive = activeScroll;
        this.setState({ scrollBarActive });
    }

    handleDocScroll = () => {
        let activeScroll = false;
        if (document.body.clientHeight > window.innerHeight) {
            // console.log("!!!!!SCROLL BAR ACTIVE!!!!!");
            activeScroll = true;
        }

        this.setWindowDimensions();
        this.setDocScroll(activeScroll);
    };

    setWindowDimensions = () => {
        let windowDimensions = this.state.windowDimensions;
        windowDimensions.clientHeight = document.body.clientHeight;
        windowDimensions.windowHeight = window.innerHeight;
        this.setState({ windowDimensions });
    };

    handleScrollTo = () => {
        let windowScroll = this.state.windowScroll;
        if (window.scrollY === 0) {
            windowScroll = true;
            window.scrollTo({ top: document.body.offsetHeight, left: 0, behavior: 'smooth' });
        } else {
            windowScroll = false;
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        this.setState({ windowScroll });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({
                applicationErrors: {
                    ...this.state.applicationErrors,
                    active: true,
                    type: 'SERVER'
                }
            });
        }

        if (
            JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data) &&
            !isEmpty(this.props.data)
        ) {
            if (this.props.data.hasOwnProperty('NODATA')) {
                this.setState({ rows: [] });
            } else {
                this.setState({
                    showLicenseCol: this.props.data.SHOW_LICENSE_COLUMN
                });
                const data = this.mapAPIResponse(this.props.data.DATA);

                this.setState({
                    rows: this.props.data.DATA
                });
            }
        }

        if (
            prevState.windowDimensions.clientHeight !== this.state.windowDimensions.clientHeight ||
            prevState.windowDimensions.clientHeight !== document.body.clientHeight
        ) {
            this.handleDocScroll();
        }
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

    mapAPIResponse = (data) => {
        return data.map((record) => {
            record.PARTA_TRANSACTION.companyDetails = this.setCompanyDetails(
                record.PARTA_TRANSACTION
            );

            return record;
        });
    };

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

        if (this.checkValidSearchParams() && !this.state.applicationErrors.active) {
            this.props.getAffidavits(
                this.props.endpoint,
                this.props.token,
                // window.localStorage.getItem('TOKEN')
                //     ? window.localStorage.getItem('TOKEN')
                //     : this.props.token,
                data
            );
        }
    };

    checkValidSearchParams = () => {
        let validSearch = true;

        //  Validate STANDARD search
        if (!this.state.advancedSearchActive) {
            if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
                validSearch = this.validateDateRange();
            } else if (this.state.standardSearch.searchValue.length < 3) {
                this.handleErrorMessages('STANDARD');
                validSearch = false;
            }
        } else {
            //  Validate ADVANCED search
            validSearch = this.validateAdvancedSearch();
        }

        this.setState({ validSearch });

        return validSearch;
    };

    validateAdvancedSearch = () => {
        let advancedSearchValid = true;

        if (this.state.standardSearch.INCEPTIONFROM || this.state.standardSearch.INCEPTIONTO) {
            advancedSearchValid = this.validateDateRange();
        } else if (
            (this.state.advancedSearch.PREMIUMFROM || this.state.advancedSearch.PREMIUMTO) &&
            advancedSearchValid
        ) {
            advancedSearchValid = this.validatePremiumRange();
        }

        if (advancedSearchValid) {
            let blankInputs = 0;
            let errorInputs = [];

            for (let control in this.state.advancedSearch) {
                if (
                    this.state.advancedSearch[control].length > 0 &&
                    this.state.advancedSearch[control].length < 3 &&
                    control !== 'PREMIUMFROM' &&
                    control !== 'PREMIUMTO'
                ) {
                    errorInputs.push(control);
                } else if (this.state.advancedSearch[control].length === 0) {
                    blankInputs++;
                }
            }

            if (errorInputs.length > 0) {
                advancedSearchValid = false;
                this.handleErrorMessages('ADVANCED', { pos: null, type: 'single' }, errorInputs);
            } else if (
                blankInputs === 8 &&
                (!this.state.standardSearch.INCEPTIONFROM || !this.state.standardSearch.INCEPTIONTO)
            ) {
                advancedSearchValid = false;
                this.handleErrorMessages('ADVANCED', { pos: null, type: 'group' });
            }
        }

        return advancedSearchValid;
    };

    validatePremiumRange = () => {
        if (
            this.state.advancedSearch.PREMIUMFROM &&
            this.state.advancedSearch.PREMIUMTO &&
            parseFloat(this.state.advancedSearch.PREMIUMFROM.replace(/,/g, '')) >=
                parseFloat(this.state.advancedSearch.PREMIUMTO.replace(/,/g, ''))
        ) {
            this.handleErrorMessages('PREMIUMS', { pos: 'start', type: 'range' });
            return false;
        } else if (!this.state.advancedSearch.PREMIUMFROM) {
            this.handleErrorMessages('PREMIUMS', { pos: 'start', type: 'valid' });
            return false;
        } else if (!this.state.advancedSearch.PREMIUMTO) {
            this.handleErrorMessages('PREMIUMS', { pos: 'end', type: 'valid' });
            return false;
        }

        return true;
    };

    validateDateRange = () => {
        if (!isValid(this.state.standardSearch.INCEPTIONFROM)) {
            this.handleErrorMessages('DATES', { type: 'valid', pos: 'start' });
        } else if (!isValid(this.state.standardSearch.INCEPTIONTO)) {
            this.handleErrorMessages('DATES', { type: 'valid', pos: 'end' });
        } else {
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
            } else {
                this.handleErrorMessages('DATES', { type: 'range', pos: 'end' });
                return false;
            }
        }

        return false;
    };

    handleErrorMessages = (type, el = null, multipleInputs = []) => {
        const errorTypes = {
            SERVER: 'SERVER',
            ADVANCED: {
                name: 'ADVANCED',
                messages: {
                    single: 'Must be at least 3 characters',
                    group: 'At least one input is required'
                }
            },
            STANDARD: {
                name: 'STANDARD',
                message: 'Must be at least 3 characters'
            },
            DATES: {
                name: 'DATES',
                messages: {
                    valid: {
                        start: 'Must enter a valid start date',
                        end: 'Must enter a valid end date'
                    },
                    range: {
                        start: 'Date cannot be after end date',
                        end: 'Date cannot be before start date'
                    }
                }
            },
            PREMIUMS: {
                name: 'PREMIUMS',
                messages: {
                    valid: {
                        start: 'Must enter a valid start amount',
                        end: 'Must enter a valid end amount'
                    },
                    range: {
                        start: 'Start amount cannot be greater than end amount'
                    }
                }
            },
            SINGLE_SEARCH: {
                name: 'SINGLE_SEARCH',
                message: 'Advanced Search is still active'
            }
        };

        let currentErrorMessage = '';
        if (errorTypes.hasOwnProperty(type)) {
            if (type === 'STANDARD') {
                currentErrorMessage = errorTypes[type].message;
            } else if (type === 'DATES') {
                currentErrorMessage = errorTypes[type].messages[el.type][el.pos];
            } else if (type === 'PREMIUMS') {
                currentErrorMessage = errorTypes[type].messages[el.type][el.pos];
            } else if (type === 'ADVANCED') {
                currentErrorMessage = errorTypes[type].messages[el.type];
            } else if (type === 'SINGLE_SEARCH') {
                currentErrorMessage = errorTypes[type].message;
            }
        } else {
            type = 'ADVANCED';
            currentErrorMessage = 'Something went wrong';
        }

        this.setState({
            applicationErrors: {
                el,
                type,
                active: true,
                multipleInputs,
                message: currentErrorMessage
            }
        });
    };

    setStartDate = (e) => {
        let endDate = null;
        if (e === null) {
            return this.setState({
                standardSearch: {
                    ...this.state.standardSearch,
                    INCEPTIONFROM: null
                },
                applicationErrors: {
                    active: false,
                    type: null,
                    message: '',
                    multipleInputs: [],
                    el: null
                }
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
                    this.handleErrorMessages('DATES', { type: 'range', pos: 'start' });
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
                        multipleInputs: [],
                        message: '',
                        el: null
                    }
                });
            } else {
                this.handleErrorMessages('DATES', { type: 'valid', pos: 'start' });
            }
        }
    };

    setEndDate = (e) => {
        if (e === null) {
            return this.setState({
                standardSearch: {
                    ...this.state.standardSearch,
                    INCEPTIONTO: null
                },
                applicationErrors: {
                    active: false,
                    type: null,
                    message: '',
                    multipleInputs: [],
                    el: null
                }
            });
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (isAfter(this.state.standardSearch.INCEPTIONFROM, e)) {
                    this.handleErrorMessages('DATES', { type: 'range', pos: 'end' });
                } else {
                    this.setState({
                        standardSearch: {
                            ...this.state.standardSearch,
                            INCEPTIONTO: e
                        },
                        applicationErrors: {
                            active: false,
                            type: null,
                            message: '',
                            multipleInputs: [],
                            el: null
                        }
                    });
                }
            } else {
                this.handleErrorMessages('DATES', { type: 'valid', pos: 'end' });
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
                multipleInputs: [],
                message: '',
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
        if (e.charCode === 13) {
            this.executeSearch();
        }
    };

    handleClose = () => {
        this.setState({
            applicationErrors: {
                active: false,
                type: null,
                multipleInputs: [],
                message: '',
                el: null
            }
        });
    };

    handleClearInput = (name = null) => {
        if (name) {
            const advancedSearch = { ...this.state.advancedSearch };
            advancedSearch[name] = '';
            this.setState({ advancedSearch });
        } else {
            const standardSearch = { ...this.state.standardSearch };
            standardSearch.searchValue = '';
            this.setState({ standardSearch });
        }
    };

    handleHelperText = () => {
        if (
            this.state.applicationErrors.active &&
            this.state.applicationErrors.type === 'SINGLE_SEARCH'
        ) {
            return;
        }

        this.setState({
            applicationErrors: {
                active: false,
                type: null,
                multipleInputs: [],
                message: '',
                el: null
            }
        });
    };

    handleCloseGeneralError = () => {
        this.setState({
            applicationErrors: {
                active: false,
                type: null,
                multipleInputs: [],
                message: '',
                el: null
            }
        });
    };

    checkAdvSearchInputsActive = (advSearch) => {
        for (const input in advSearch) {
            if (advSearch[input].length > 0) {
                this.handleErrorMessages('SINGLE_SEARCH');
                break;
            }
        }
    };

    toggleAdvancedSearchPanel = () => {
        if (!this.state.advancedSearchActive) {
            this.setState({
                advancedSearchActive: true,
                applicationErrors: {
                    active: false,
                    type: null,
                    multipleInputs: [],
                    message: '',
                    el: null
                },
                standardSearch: {
                    ...this.state.standardSearch
                    // searchValue: ''
                }
            });
        } else {
            this.checkAdvSearchInputsActive(this.state.advancedSearch);
            this.setState({
                advancedSearchActive: false
            });
        }

        setTimeout(() => {
            this.props.handleDocScroll();
            this.props.updateScroll();
        }, 1000);
    };

    handleAdvancedSearchInputs = (e) => {
        if (this.state.standardSearch.searchValue.length > 0) {
            this.handleClearInput();
        }

        if (this.state.advancedSearch.hasOwnProperty(e.target.name)) {
            this.setState({
                advancedSearch: {
                    ...this.state.advancedSearch,
                    [e.target.name]: e.target.value
                },
                applicationErrors: {
                    active: false,
                    type: null,
                    multipleInputs: [],
                    message: '',
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
                searchValue: '',
                INCEPTIONFROM: null,
                INCEPTIONTO: null
            }
        });
    };

    setAffidavits = (rows) => {
        this.setState({ rows });
    };

    handleScrollClick = () => {
        let windowScroll = this.state.windowScroll;
        windowScroll = !windowScroll;
        this.setState({ windowScroll });

        setTimeout(() => {
            this.props.handleScrollTo();
        }, 250);
    };

    render() {
        return (
            <ErrorBoundary>
                <Search
                    loading={this.props.loading}
                    applicationErrors={this.state.applicationErrors}
                    searchValue={this.state.standardSearch.searchValue}
                    handleChange={this.handleChange}
                    handleKeyPress={this.handleKeyPress}
                    executeSearch={this.executeSearch}
                    handleClearInput={this.handleClearInput}
                    handleHelperText={this.handleHelperText}
                    advancedSearchActive={this.state.advancedSearchActive}
                    toggleAdvancedSearchPanel={this.toggleAdvancedSearchPanel}
                    handleFromDateInput={this.setStartDate}
                    handleToDateInput={this.setEndDate}
                    standardSearch={this.state.standardSearch}
                    advancedSearch={this.state.advancedSearch}
                    handleAdvancedSearchInputs={this.handleAdvancedSearchInputs}
                    handleAdvancedKeyPress={this.handleAdvancedKeyPress}
                    handleCloseGeneralError={this.handleCloseGeneralError}
                    clearAdvancedSearchInputs={this.clearAdvancedSearchInputs}
                    handleDocScroll={this.handleDocScroll}
                    windowDimensions={this.state.windowDimensions}
                />
                <Table
                    setAffidavits={this.setAffidavits}
                    loading={this.props.loading}
                    rows={this.state.rows}
                    adjustPadding={this.state.adjustPadding}
                    showLicenseCol={this.state.showLicenseCol}
                />
                <Snackbar
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    handleClose={this.handleClose}
                    message={this.props.error ? this.props.error : ''}
                    open={
                        this.state.applicationErrors.active &&
                        this.state.applicationErrors.type === 'SERVER'
                    }
                    severity={'error'}
                    title={'Something went wrong'}
                />
                {this.props.scrollActive
                    ? (console.log(window.scrollY),
                      (
                          <Grid sx={{ position: 'fixed', bottom: '24px', left: '30px' }}>
                              <Tooltip
                                  placement='top'
                                  title={
                                      this.state.windowScroll ? 'Scroll to Top' : 'Scroll to Bottom'
                                  }
                              >
                                  <Fab
                                      color='secondary'
                                      aria-label='Scroll to Bottom'
                                      size='small'
                                      onClick={this.handleScrollClick}
                                  >
                                      {this.state.windowScroll ? <ExpandLess /> : <ExpandMore />}
                                  </Fab>
                              </Tooltip>
                          </Grid>
                      ))
                    : null}
            </ErrorBoundary>
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
