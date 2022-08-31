import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchButton, SearchInput, SelectInput } from '@aeros-ui/components';
import { Grid, MenuItem, Paper, Typography } from '@mui/material';

const Header = ({ organizations, onSearch, loading }) => {
    const [error, setError] = useState(false);
    const errorRef = useRef(false);
    const [companies, setCompanies] = useState([]);
    const [query, setQuery] = useState({
        search: '',
        org: ''
    });

    //runs when organization is updated
    useEffect(() => {
        setCompanies([{ CODE: ' ', DESCRIPTION: 'ALL' }, ...organizations]);
        setQuery({ ...query, org: ' ' });
    }, [organizations]);

    const { search, org } = query;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setError(false);

        if (name === 'search') {
            setQuery({ ...query, search: value });
        } else {
            setQuery({ ...query, org: value });
        }
    };

    const handleSubmit = () => {
        console.log({ search, org });

        if (search.length === 0 && org === ' ') {
            setError(true);
            errorRef.current = true;
            console.log(errorRef.current);
        } else {
            errorRef.current = false;
        }

        if (!errorRef.current) {
            onSearch(org, search.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            handleSubmit();
        }
    };
    const handleClearInput = () => {
        setQuery({ ...query, search: '' });
    };

    return (
        <Paper sx={{ m: 2, p: 3 }}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item container>
                    <Typography variant='h6'>Declining Companies Inquiry</Typography>
                </Grid>
                <Grid item xs={4}>
                    <SearchInput
                        label={'Search by Company Name, NAIC,...'}
                        width={'80%'}
                        onChange={handleOnChange}
                        error={error}
                        name='search'
                        includeEndAdornment={true}
                        handleClearInput={handleClearInput}
                        value={search}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        onClick={() => setError(false)}
                        helperText={error ? 'Must be at least 1 characters' : null}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SelectInput
                        label='Organization Type'
                        onChange={handleOnChange}
                        name='org'
                        value={org}
                        disabled={loading}
                        width={'80%'}>
                        {companies.map((company) => {
                            return (
                                <MenuItem name='org' key={company.CODE} value={company.CODE}>
                                    {company.DESCRIPTION}
                                </MenuItem>
                            );
                        })}
                    </SelectInput>
                </Grid>
                <Grid item xs={4}>
                    <SearchButton onClick={handleSubmit} loading={loading} />
                </Grid>
            </Grid>
        </Paper>
    );
};

Header.propTypes = {
    organizations: PropTypes.array,
    onSearch: PropTypes.func,
    loading: PropTypes.bool
};

export default Header;
