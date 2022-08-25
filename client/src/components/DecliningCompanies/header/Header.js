import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchButton, SearchInput, SelectInput } from '@aeros-ui/components';
import { Grid, MenuItem, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { theme } from '@aeros-ui/themes';

const Header = ({ onShowRows, organizations }) => {
    const [errorStyle, setErrorStyle] = useState(false);
    const [query, setQuery] = useState({
        search: '',
        org: ' '
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        if (name === 'search') {
            console.log(e.target);
            setQuery({ ...query, search: value });
            e.target.value.length < 3 && e.target.value.length > 0
                ? setErrorStyle(true)
                : setErrorStyle(false);
        } else {
            setQuery({ ...query, org: value });
            console.log(e.target);
        }
    };

    const { search, org } = query;

    const handleOnClick = () => {
        console.log({ search, org });
        onShowRows();
    };

    return (
        <Paper sx={{ m: 2, p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Declining Companies Inquiry</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Stack>
                        <SearchInput
                            label='Search by Company Name, NAIC,...'
                            width={350}
                            onChange={handleOnChange}
                            error={errorStyle}
                            name='search'
                            value={search}
                        />

                        {errorStyle ? (
                            <Typography variant='caption' color={theme.palette.error.main}>
                                Must be atleast 3 characters
                            </Typography>
                        ) : (
                            <Typography variant='caption'> </Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    {' '}
                    <Box
                        sx={{
                            mx: 2
                        }}>
                        <SelectInput
                            label='Organization Type'
                            onChange={handleOnChange}
                            name='org'
                            value={org}
                            width={300}>
                            {organizations.map((organization) => {
                                return (
                                    <MenuItem
                                        name='org'
                                        key={organization.code}
                                        value={organization.code}>
                                        {organization.description}
                                    </MenuItem>
                                );
                            })}
                        </SelectInput>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <SearchButton onClick={handleOnClick} loading={false} />
                </Grid>
            </Grid>
        </Paper>
    );
};

Header.propTypes = {
    onShowRows: PropTypes.func,
    organizations: PropTypes.array
};

export default Header;
