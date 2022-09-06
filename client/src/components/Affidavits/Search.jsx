import React, { useRef } from 'react';
import { Typography, Paper, Grid, IconButton, Tooltip, Stack } from '@mui/material';
import {
    SearchInput,
    SearchButton,
    DateInput,
    TextInput,
    CurrencyInput
} from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TextItem = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
}));

const StyledIconButton = styled(IconButton)(() => ({
    backgroundColor: '#004A8F',
    color: '#FFFFFF',
    height: '1.5em',
    width: '1.5em',
    '&:hover': {
        backgroundColor: '#002746',
        color: '#FFFFFF'
    }
}));

function Search({
    loading,
    errorStyle,
    searchValue,
    handleChange,
    handleKeyPress,
    executeSearch,
    handleClearInput,
    handleHelperText,
    adjustPadding,
    advancedSearchActive, 
    handleShowAdvancedSearch,
    handleFromDateInput,
    handleToDateInput,
    standardSearch
}) {
    const advancedSearchRef = useRef(null);

    return (
        <Paper
            sx={{
                padding: '1em',
                mt: '1em',
                mr: `${adjustPadding ? '0.10em' : '1em'}`,
                ml: '1em',
                mb: '1em'
            }}
            variant={'outlined'}>
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
                            disabled={advancedSearchActive}
                            includeEndAdornment={true}
                            handleClearInput={handleClearInput}
                        />
                    </Grid>
                    <Grid item>
                        <DateInput
                            label={'Inception Date'}
                            onChange={handleFromDateInput}
                            value={standardSearch.INCEPTIONFROM}
                        />
                    </Grid>
                    <Grid item>
                        <TextItem>TO</TextItem>
                    </Grid>
                    <Grid item sx={{ mr: 3 }}>
                        <DateInput
                            label={'Inception Date'}
                            onChange={handleToDateInput}
                            value={standardSearch.INCEPTIONTO}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 1, mr: 3 }}>
                        <SearchButton sx={{ ml: 1 }} loading={loading} onClick={executeSearch}>
                            Search
                        </SearchButton>
                    </Grid>
                    <Grid item sx={{ mt: 1 }}>
                        <Tooltip title='Toggle Advanced Search' arrow placement='top'>
                            <StyledIconButton
                                ref={advancedSearchRef}
                                aria-label={'Toggle Advanced Search'}
                                onClick={handleShowAdvancedSearch}>
                                {advancedSearchActive ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </StyledIconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                {advancedSearchActive && (
                    <>
                        <Typography variant='subtitle1' sx={{ paddingBottom: 1, mt: 1 }}>
                            Advanced Search
                        </Typography>
                        <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={''}
                                    label={'Search by Affidavit No'}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={''}
                                    label={'Search by Policy No'}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextInput width={'100%'} value={''} label={'Search by Batch'} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ flexGrow: 1, pt: 3 }} spacing={2}>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={''}
                                    label={'Search by Insured Name'}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={''}
                                    label={'Search by Batch Contact'}
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={''}
                                    label={'Search by Reference'}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ flexGrow: 1, pt: 3 }}>
                            <Grid item>
                                <CurrencyInput
                                    label={'Premuim'}
                                    onChange={() => {
                                        console.log('premium changed');
                                    }}
                                    value={''}
                                />
                            </Grid>
                            <Grid item>
                                <TextItem>TO</TextItem>
                            </Grid>
                            <Grid item sx={{ mr: 3 }}>
                                <CurrencyInput
                                    label={'Premium'}
                                    onChange={() => {
                                        console.log('premium changed');
                                    }}
                                    value={''}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Stack>
        </Paper>
    );
}

export default Search;
