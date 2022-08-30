import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { SearchInput, SearchButton } from '@aeros-ui/components';
import { Stack } from '@mui/system';

function Search({ loading, errorStyle, searchValue, handleChange, handleKeyPress, showRows }) {
    return (
        <Paper sx={{ padding: '1em', margin: '1em' }} variant={'outlined'}>
            <Typography variant='h6' sx={{ paddingBottom: 1 }}>
                Life Brokers Inquiry
            </Typography>
            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                <Grid item xs={5}>
                    <Stack spacing={1}>
                        <SearchInput
                            sx={{ mr: 1 }}
                            label={'Search by License No, Broker name...'}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            value={searchValue}
                            width={'97%'}
                            error={errorStyle}
                        />
                        {errorStyle && (
                            <Typography variant='caption' color={'error.main'}>
                                Must be at least 3 characters
                            </Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid sx={{ mt: 1 }} item xs={2}>
                    <SearchButton sx={{ ml: 1 }} loading={loading} onClick={showRows}>
                        Search
                    </SearchButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Search;
