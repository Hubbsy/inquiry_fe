import React from 'react';
import PropTypes from 'prop-types';
import { SearchButton } from '@aeros-ui/components';
import DeclCompanySearch from './DeclCompanySearch';
import { Grid, Paper, Typography } from '@mui/material';
import DeclCompanyOrg from './DeclCompanyOrg';
import { theme } from '@aeros-ui/themes';

const Header = ({ onShowRows, organization }) => {
    return (
        <Paper sx={{ m: 2, p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Declining Companies Inquiry</Typography>
                </Grid>
                <Grid item xs={4}>
                    <DeclCompanySearch theme={theme} />
                </Grid>
                <Grid item xs={4}>
                    <DeclCompanyOrg organization={organization} />
                </Grid>
                <Grid item xs={4}>
                    <SearchButton onClick={onShowRows} loading={false} />
                </Grid>
            </Grid>
        </Paper>
    );
};

Header.propTypes = {
    onShowRows: PropTypes.func,
    organization: PropTypes.array
};

export default Header;
