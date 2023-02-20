import React from 'react';
import Search from '../components/Affidavits/Search';
import Table from '../components/Affidavits/Table/Table';
import { connect } from 'react-redux';
import { getAffidavits } from '../store/actions/affidavits';
import { Snackbar, ErrorBoundary } from '@aeros-ui/components';
import isEmpty from '../functions/isEmpty';
import { Fab, Grid, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

class Affidavits extends React.Component {
    state = {
        rows: [],
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

    handleErrorMessages = (type, el = null, multipleInputs = []) => {
        const errorTypes = {
            SERVER: 'SERVER',
            ADVANCED: {
                name: 'ADVANCED',
                messages: {
                    single: 'Must be at least 3 characters',
                    group: 'At least one input or Inception Date range is required for the search'
                }
            },
            COMBOSEARCH: {
                name: 'COMBOSEARCH',
                message: 'Must be at least 3 characters'
            },
            GENERAL: {
                name: 'GENERAL',
                message: 'At least one input or Inception Date range is required for the search'
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
            if (type === 'COMBOSEARCH') {
                currentErrorMessage = errorTypes[type].message;
            } else if (type === 'GENERAL') {
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
            type = 'GENERAL';
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

    resetAppErrors = () => {
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
                }
            });
        } else {
            this.setState({
                advancedSearchActive: false
            });
        }

        setTimeout(() => {
            this.props.handleDocScroll();
            this.props.updateScroll();
        }, 1000);
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
                    advancedSearchActive={this.state.advancedSearchActive}
                    toggleAdvancedSearchPanel={this.toggleAdvancedSearchPanel}
                    checkAdvSearchInputsActive={this.checkAdvSearchInputsActive}
                    handleDocScroll={this.handleDocScroll}
                    windowDimensions={this.state.windowDimensions}
                    handleErrorMessages={this.handleErrorMessages}
                    getAffidavits={this.props.getAffidavits}
                    token={this.props.token}
                    endpoint={this.props.endpoint}
                    resetAppErrors={this.resetAppErrors}
                    userGuideURL={this.props.userGuideURL}
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
                                  }>
                                  <Fab
                                      color='secondary'
                                      aria-label='Scroll to Bottom'
                                      size='small'
                                      onClick={this.handleScrollClick}>
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
        error: state.affidavits.error,
        userGuideURL: state.session.userGuideURL
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAffidavits: (endpoint, token, data) => dispatch(getAffidavits(endpoint, token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Affidavits);
