import { Routes, Route } from 'react-router-dom';
import InquiryOutlet from './pages/InquiryOutlet';
import Affidavits from './pages/Affidavits';
import DecliningCompanies from './pages/DecliningCompanies';
import LifeBrokers from './pages/LifeBrokers';
import ProducingBrokers from './pages/ProducingBrokers';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@aeros-ui/themes';
import { PageNotFound } from '@aeros-ui/components';

const App = () => {
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
};

export default App;
