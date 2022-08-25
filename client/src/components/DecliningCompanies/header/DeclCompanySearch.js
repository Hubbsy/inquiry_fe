import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from '@aeros-ui/components';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

const DeclCompanySearch = ({ theme }) => {
    const [errorStyle, setErrorStyle] = useState(false);
    const [search, setSearch] = useState('');

    return (
        <Stack>
            <SearchInput
                label='Search by Company Name, NAIC,...'
                width={350}
                onChange={(e) => {
                    e.target.value.length < 3 && e.target.value.length > 0
                        ? setErrorStyle(true)
                        : setErrorStyle(false);
                    setSearch(e.target.value);
                }}
                error={errorStyle}
                value={search}
            />

            {errorStyle ? (
                <Typography variant='caption' color={theme.palette.error.main}>
                    Must be atleast 3 characters
                </Typography>
            ) : (
                ''
            )}
        </Stack>
    );
};

DeclCompanySearch.propTypes = {
    theme: PropTypes.object
};

export default DeclCompanySearch;
