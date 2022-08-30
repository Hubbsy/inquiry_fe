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
                SECURITYID: 59,
                BROKERID: 103,
                USERID: 'RSIDEV',
                IP: '10.233.51.122'
            }
        };

        this.props.getToken(endpoint, data);
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

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (endpoint, data) => dispatch(getToken(endpoint, data)),
        setEndpoint: (endpoint) => dispatch(setEndpoint(endpoint))
    };
};

export default connect(null, mapDispatchToProps)(App);
