import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { SearchButton } from '@aeros-ui/components';
import DeclCompanySearch from './DeclCompanySearch';
import { Paper, Typography } from '@mui/material';
import DeclCompanyOrg from './DeclCompanyOrg';

const Header = ({ onShowRows }) => {
    return (
        <Paper sx={{ my: 1, p: 3 }}>
            <Typography variant='h6'>Declining Companies Inquiry</Typography>
            <Box style={{ display: 'flex' }} sx={{ my: 2, mx: 0 }}>
                <DeclCompanySearch />
                <DeclCompanyOrg />
                <SearchButton onClick={onShowRows} loading={false} />
            </Box>
        </Paper>
    );
};

Header.propTypes = {
    onShowRows: PropTypes.func
};

export default Header;
