import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { SearchInput, SearchButton } from '@aeros-ui/components';
import { TextDecreaseTwoTone } from '@mui/icons-material';

function Search ({ searchValue, setSearchValue, showRows }) {

    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        console.log(e.target);
        if (e.charCode === 13 && e.target.value.length >= 3) {
            showRows({searchValue});
        }
    };

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
                            onKeyPress={handleKeyPress}
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
