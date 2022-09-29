import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import InquiryOutlet from './pages/InquiryOutlet';
import Affidavits from './pages/Affidavits';
import DecliningCompanies from './pages/DecliningCompanies';
import LifeBrokers from './pages/LifeBrokers';
import ProducingBrokers from './pages/ProducingBrokers';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@aeros-ui/themes';
import { PageNotFound } from '@aeros-ui/components';
import { connect } from 'react-redux';
import endpointConfig from './store/endpointConfig';
import { getToken, setEndpoint } from './store/actions/session';

class App extends Component {
    state = {
        token: localStorage.getItem('TOKEN') || false
    };

    componentDidMount() {
        // call getToken
        const env = 'NYACOL';
        const endpoint = endpointConfig(env);
        this.props.setEndpoint(endpoint);
        const data = {
            DEV: 'SARAH',
            SESSIONTYPE: 'BrokerPortal',
            SECPAYLOAD: {
                ENV: env,
                OWNERSECURITYID: 1,
                SECURITYID: 1713,
                BROKERID: 4011,
                // SECURITYID: 59,
                // BROKERID: 103,
                USERID: 'RSIDEV',
                IP: '10.233.51.123'
            }
        };

        if (!this.state.token) {
            console.log('NEW TOKEN GENERATED');
            // console.log('TOKEN:', this.state.token);
            this.props.getToken(endpoint, data);
        } else {
            // console.log('TOKEN:', this.state.token);
            console.log('NEW TOKEN IS NOT GENERATED');
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.token !== this.props.token &&
            this.props.token !== null &&
            !this.state.token
        ) {
            // console.log('COMPONENT DID UPDATE:', this.props.token);
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
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.session.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (endpoint, data) => dispatch(getToken(endpoint, data)),
        setEndpoint: (endpoint) => dispatch(setEndpoint(endpoint))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
