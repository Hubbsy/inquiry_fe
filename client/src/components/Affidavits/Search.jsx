import React from 'react';
import { Typography, Paper, Grid, Button, IconButton, useTheme } from '@mui/material';
import { SearchInput, SearchButton, DateInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Search({
    loading,
    errorStyle,
    searchValue,
    handleChange,
    handleKeyPress,
    showRows,
    handleClearInput,
    handleHelperText
}) {

    const theme = useTheme();

    const Item = styled(Box)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }));

    const StyledIconButton = styled(IconButton)(({ theme }) => ({
        backgroundColor: "#004A8F", 
        color: "#FFFFFF", 
        height: "1.5em", 
        width: "1.5em", 
        '&:hover': {
            backgroundColor: "#002746",
            color: '#FFFFFF'
        },
    }));


    return (
        <Paper sx={{ padding: '1em', margin: '1em' }} variant={'outlined'}>
            <Typography variant='h6' sx={{ paddingBottom: 1 }}>
                Affidavits Inquiry
            </Typography>
            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                <Grid item xs={5}>
                    <SearchInput
                        sx={{ mr: 1 }}
                        label={'Search by Affidavit No, Policy No, Batch or Insured Name...'}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        onClick={handleHelperText}
                        value={searchValue}
                        width={'97%'}
                        error={errorStyle}
                        helperText={errorStyle ? 'Must be at least 3 characters' : null}
                        includeEndAdornment={true}
                        handleClearInput={handleClearInput}
                    />
                </Grid>
                <Grid item >
                    <DateInput 
                        label={"Inception Date"}    
                        onChange={() => {console.log("date changed")}}
                        value={null}
                    />
                </Grid>
                <Grid item>
                    <Item>
                        TO
                    </Item>
                </Grid>
                <Grid item sx={{ mr: 3 }} >
                    <DateInput 
                        label={"Inception Date"}    
                        onChange={() => {console.log("date changed")}}
                        value={null}
                    />
                </Grid>
                <Grid item sx={{ mt: 1, mr: 3 }}>
                    <SearchButton sx={{ ml: 1 }} loading={loading} onClick={showRows}>
                        Search
                    </SearchButton>
                </Grid>
                <Grid item sx={{mt: 1}}>
                        <StyledIconButton>
                            <KeyboardArrowDownIcon />
                        </StyledIconButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Search;