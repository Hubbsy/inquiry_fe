import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchButton, SearchInput, SelectInput } from '@aeros-ui/components';
import { Grid, MenuItem, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { theme } from '@aeros-ui/themes';

const Header = ({ onShowRows, organizations, onSearch }) => {
    const [error, setError] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [query, setQuery] = useState({
        search: '',
        org: ''
    });

    //runs when organization is updated
    useEffect(() => {
        setCompanies([{ CODE: ' ', DESCRIPTION: 'ALL' }, ...organizations]);
        console.log('org', companies);
        setQuery({ ...query, org: ' ' });
    }, [organizations]);

    const { search, org } = query;

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        if (name === 'search') {
            setQuery({ ...query, search: value });
            e.target.value.length < 3 && e.target.value.length > 0
                ? setError(true)
                : setError(false);
        } else {
            setQuery({ ...query, org: value });
        }
    };

    const handleOnClick = () => {
        if (!error && search) {
            onSearch(org, search);
            // onShowRows();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === 'enter' && !error && search) {
            onSearch(org, search);
            // onShowRows();
        }
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
                            label={'Search by Company Name, NAIC,...'}
                            width={350}
                            onChange={handleOnChange}
                            error={error}
                            name='search'
                            value={search}
                            onKeyDown={handleKeyDown}
                        />

                        {error ? (
                            <Typography variant='caption' color={theme.palette.error.main}>
                                Must be atleast 3 characters
                            </Typography>
                        ) : (
                            <Typography variant='caption'>{''}</Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={4}>
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
                            {companies.map((company) => {
                                return (
                                    <MenuItem name='org' key={company.CODE} value={company.CODE}>
                                        {company.DESCRIPTION}
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
    organizations: PropTypes.array,
    onSearch: PropTypes.func
};

export default Header;
