import React, { useState } from 'react';
import { Typography, Paper, styled, Grid } from '@mui/material';
import { SearchInput, SearchButton } from '@aeros-ui/components';

const Search = ({ searchValue, handleChange, showRows }) => {

    const StyledSearchButton = styled(SearchButton)(({ theme }) => ({
        marginLeft: 20,
        marginTop: 5
    }));

    return (
            <Paper sx={{padding: '1em', margin: "1em"}}  variant={'outlined'}>
                <Typography
                    variant='h6'
                    sx={{paddingBottom: 1}}
                >
                    Producing Brokers Inquiry
                </Typography>
                <Grid sx={{flexGrow: 1}} container spacing={0.5}>
                    <Grid item xs={5}>
                        <SearchInput
                            sx={{ mr: 1}}
                            label={'Search by License No, Broker name...'}
                            onChange={handleChange}
                            value={searchValue}
                            width={'97%'}
                        />  
                    </Grid>
                    <Grid sx={{mt: 1}} item xs={2}>
                        <SearchButton sx={{ml: 1}} loading={false} onClick={showRows}>Search</SearchButton>
                    </Grid>
                </Grid>
            </Paper>
    );
}

export default Search;
