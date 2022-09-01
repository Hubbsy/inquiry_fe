import React from 'react';
import { Typography, Paper, Grid, Button, IconButton, useTheme, Tooltip, Stack } from '@mui/material';
import { SearchInput, SearchButton, DateInput, TextInput, CurrencyInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef } from 'react';

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
    const advancedSearchRef = useRef(null);

    const TextItem = styled(Box)(({ theme }) => ({
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

    const handleShowAdvancedSearch = () => {
        console.log("button clicked!");
        console.log(advancedSearchRef.current.style);
        advancedSearchRef.current.style.transform = "rotate(180deg)";
    }

    return (
        <Paper sx={{ padding: '1em', margin: '1em' }} variant={'outlined'}>
            <Typography variant='h6' sx={{ paddingBottom: 1 }}>
                Affidavit Inquiry
            </Typography>
            <Stack>
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
                        <TextItem>
                            TO
                        </TextItem>
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
                        <Tooltip title="Show Advanced Search" arrow placement='top'>
                            <StyledIconButton ref={advancedSearchRef} onClick={handleShowAdvancedSearch}>
                                <KeyboardArrowDownIcon />
                            </StyledIconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Typography variant='subtitle1' sx={{ paddingBottom: 1, mt: 1 }}>
                Advanced Search
                </Typography>
                <Grid container sx={{ flexGrow: 1 }} spacing={2} >
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Affidavit No"}/>
                    </Grid>
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Policy No"}/>
                    </Grid>
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Batch"}/>
                    </Grid>
                </Grid>
                <Grid container sx={{ flexGrow: 1, pt: 3 }} spacing={2} >
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Insured Name"}/>
                    </Grid>
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Batch Contact"}/>
                    </Grid>
                    <Grid item xs={2.5}>
                        <TextInput width={"100%"} value={""} label={"Search by Reference"}/>
                    </Grid>
                </Grid>
                <Grid container sx={{ flexGrow: 1, pt: 3 }} >
                    <Grid item >
                        <CurrencyInput 
                            label={"Premuim"}    
                            onChange={() => {console.log("premium changed")}}
                            value={""}
                        />
                    </Grid>
                    <Grid item>
                        <TextItem>
                            TO
                        </TextItem>
                    </Grid>
                    <Grid item sx={{ mr: 3 }} >
                        <CurrencyInput 
                            label={"Premium"}    
                            onChange={() => {console.log("premium changed")}}
                            value={""}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
}

export default Search;