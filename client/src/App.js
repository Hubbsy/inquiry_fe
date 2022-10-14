import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import InquiryOutlet from './pages/InquiryOutlet';
import Affidavits from './pages/Affidavits';
import DecliningCompanies from './pages/DecliningCompanies';
import LifeBrokers from './pages/LifeBrokers';
import ProducingBrokers from './pages/ProducingBrokers';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@aeros-ui/themes';
import { PageNotFound, SessionTimeout } from '@aeros-ui/components';
import { connect } from 'react-redux';
import endpointConfig from './store/endpointConfig';
import { getToken, verifyAuth, setEndpoint, setToken } from './store/actions/session';
import queryString from 'query-string';
import isEmpty from './functions/isEmpty';

class App extends Component {
    state = {
        token: localStorage.getItem('TOKEN') || false
    };

    componentDidMount() {
        const parsedURL = queryString.parse(window.location.search);
        const parsedData = !isEmpty(parsedURL) ? JSON.parse(parsedURL.DATA) : null;

        if (
            parsedData !== null &&
            parsedData.hasOwnProperty('ENV') &&
            parsedData.hasOwnProperty('SRID') &&
            process.env.NODE_ENV === 'production'
        ) {
            console.log('PARSED DATA:', parsedData);
            const env = parsedData.ENV;
            const srId = parsedData.SRID;

            const data = {
                SVC_ID: srId.replaceAll(' ', '+')
            };
            const endpoint = endpointConfig(env);
            this.props.setEndpoint(endpoint);
            this.props.verifyAuth(endpoint, data);
        } else {
            const env = 'NYACOL';
            const endpoint = endpointConfig(env);
            this.props.setEndpoint(endpoint);
            const data = {
                DEV: 'SARAH',
                SESSIONTYPE: 'BrokerPortal',
                SECPAYLOAD: {
                    ENV: env,
                    OWNERSECURITYID: 1,
                    // SECURITYID: 1713,
                    // BROKERID: 4011,
                    // SECURITYID: 1085, //BOR
                    // BROKERID: 2902, //BOR
                    SECURITYID: 59,
                    BROKERID: 103,
                    USERID: 'RSIDEV',
                    IP: '10.233.51.123'
                }
            };

            if (!this.state.token) {
                console.log('NEW TOKEN GENERATED');
                this.props.getToken(endpoint, data);
            } else {
                console.log('NEW TOKEN IS NOT GENERATED');
                // console.log('STATE TOKEN', this.state.token);
                this.props.setToken(this.state.token);
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.token !== this.props.token &&
            this.props.token !== null &&
            !this.state.token &&
            process.env.NODE_ENV !== 'production'
        ) {
            window.localStorage.setItem('TOKEN', this.props.token);
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/inquiry' element={<InquiryOutlet />}>
                        <Route path='affidavits' element={<Affidavits />} />
                        <Route path='declining-companies' element={<DecliningCompanies />} />
                        <Route path='life-brokers' element={<LifeBrokers />} />
                        <Route path='producing-brokers' element={<ProducingBrokers />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
                {this.props.sessionTimeout ? (
                    <SessionTimeout open={this.props.sessionTimeout} />
                ) : null}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.session.auth.token,
        sessionTimeout: state.session.sessionTimeout
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (endpoint, data) => dispatch(getToken(endpoint, data)),
        setEndpoint: (endpoint) => dispatch(setEndpoint(endpoint)),
        setToken: (token) => dispatch(setToken(token)),
        verifyAuth: (endpoint, data) => dispatch(verifyAuth(endpoint, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
