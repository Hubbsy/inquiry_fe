import React, { useRef } from 'react';
import { Typography, Paper, Grid, IconButton, Tooltip, Stack, Collapse, Fab } from '@mui/material';
import {
    SearchInput,
    SearchButton,
    DateInput,
    TextInput,
    CurrencyInput, 
    Alert,
    ClearButton
} from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const TextItem = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
}));

function Search({
    loading,
    applicationErrors,
    searchValue,
    handleChange,
    handleKeyPress,
    executeSearch,
    handleClearInput,
    handleHelperText,
    adjustPadding,
    advancedSearchActive, 
    toggleAdvancedSearchPanel,
    handleFromDateInput,
    handleToDateInput, 
    standardSearch,
    handleAdvancedSearchInputs,
    advancedSearch,
    handleAdvancedKeyPress,
    advancedInputsError,
    handleCloseGeneralError,
    clearAdvancedSearchInputs
}) {

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
                <Grid sx={{ flexGrow: 1, flexWrap: "nowrap" }} container spacing={0.5} >
                    <Grid item xs={5}>
                        <SearchInput
                            sx={{ mr: 1 }}
                            label={'Search by Affidavit No, Policy No, Batch or Insured Name...'}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            onClick={handleHelperText}
                            value={searchValue}
                            width={'97%'}
                            error={applicationErrors.active && applicationErrors.type === "STANDARD"}
                            helperText={applicationErrors.active && applicationErrors.type === "STANDARD" ? applicationErrors.message : null}
                            disabled={advancedSearchActive}
                            includeEndAdornment={true}
                            handleClearInput={handleClearInput}
                        />
                    </Grid>
                    <Grid item>
                        <DateInput
                            label={'Inception Date'}
                            onChange={handleFromDateInput}
                            value={applicationErrors.active && applicationErrors.el.pos === "start" ? "" : standardSearch.INCEPTIONFROM}
                            helperText={applicationErrors.active && applicationErrors.el.pos === "start" ? applicationErrors.message : null}
                        />
                    </Grid>
                    <Grid item>
                        <TextItem>TO</TextItem>
                    </Grid>
                    <Grid item sx={{ mr: 3 }}>
                        <DateInput
                            label={'Inception Date'}
                            onChange={handleToDateInput}
                            value={applicationErrors.active && applicationErrors.el.pos === "end" ? "" : standardSearch.INCEPTIONFROM}
                            helperText={applicationErrors.active && applicationErrors.el.pos === "end" ? applicationErrors.message : null}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 1, mr: 3 }}>
                        <SearchButton sx={{ ml: 1 }} loading={loading} onClick={executeSearch}>
                            Search
                        </SearchButton>
                    </Grid>
                    <Grid item sx={{ mt: 1 }}>
                    {advancedSearchActive ? (
                        <Tooltip placement='top' title='Hide Advanced Search'>
                            <Fab
                                color='secondary'
                                aria-label='hide advanced search'
                                size='small'
                                onClick={toggleAdvancedSearchPanel}>
                                <ExpandLess />
                            </Fab>
                        </Tooltip>
                        ) : (
                        <Tooltip placement='top' title='Show Advanced Search'>
                            <Fab
                                color='secondary'
                                aria-label='show advanced search'
                                size='small'
                                onClick={toggleAdvancedSearchPanel}>
                                <ExpandMore />
                            </Fab>
                        </Tooltip>
                        )}
                    </Grid>
                </Grid>
                <Collapse in={advancedSearchActive} width={"100%"}>
                        <>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography variant='subtitle1' sx={{ paddingBottom: 1, mt: 1 }}>
                                    Advanced Search
                                </Typography>
                            </Grid>
                            <Grid item >
                                <ClearButton onClick={clearAdvancedSearchInputs} sx={{height: "2em", width: "2em", m: 1}} />
                            </Grid>
                        </Grid>
                            <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                                <Grid item xs={2.5}>
                                    <TextInput
                                        width={'100%'}
                                        value={advancedSearch.AFFIDAVITNUMBER}
                                        label={'Search by Affidavit No'}
                                        name={'AFFIDAVITNUMBER'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'AFFIDAVITNUMBER'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'AFFIDAVITNUMBER' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <TextInput
                                        width={'100%'}
                                        value={advancedSearch.POLICYNUMBER}
                                        label={'Search by Policy No'}
                                        name={'POLICYNUMBER'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'POLICYNUMBER'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'POLICYNUMBER' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <TextInput 
                                        width={'100%'} 
                                        value={advancedSearch.BATCH} 
                                        label={'Search by Batch'} 
                                        name={'BATCH'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'BATCH'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'BATCH' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ flexGrow: 1, pt: 3 }} spacing={2}>
                                <Grid item xs={2.5}>
                                    <TextInput
                                        width={'100%'}
                                        value={advancedSearch.INSUREDNAME}
                                        label={'Search by Insured Name'}
                                        name={'INSUREDNAME'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'INSUREDNAME'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'INSUREDNAME' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <TextInput
                                        width={'100%'}
                                        value={advancedSearch.CONTACTNAME}
                                        label={'Search by Batch Contact'}
                                        name={'CONTACTNAME'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'CONTACTNAME'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'CONTACTNAME' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <TextInput
                                        width={'100%'}
                                        value={advancedSearch.BROKERREFERENCE}
                                        label={'Search by Reference'}
                                        name={'BROKERREFERENCE'}
                                        onChange={handleAdvancedSearchInputs}
                                        onKeyPress={handleAdvancedKeyPress}
                                        error={advancedInputsError.active && advancedInputsError.id === 'BROKERREFERENCE'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'BROKERREFERENCE' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ flexGrow: 1, pt: 3, position: "relative" }}>
                                <Grid item>
                                    <CurrencyInput
                                        label={'Premuim From'}
                                        name={'PREMIUMFROM'}
                                        decimalPlaces={0}
                                        value={advancedSearch.PREMIUMFROM}
                                        onChange={handleAdvancedSearchInputs}
                                        error={advancedInputsError.active && advancedInputsError.id === 'PREMIUMFROM'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'PREMIUMFROM' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextItem>TO</TextItem>
                                </Grid>
                                <Grid item sx={{ mr: 3 }}>
                                    <CurrencyInput
                                        label={'Premium To'}
                                        name={'PREMIUMTO'}
                                        decimalPlaces={0}
                                        value={advancedSearch.PREMIUMTO}
                                        onChange={handleAdvancedSearchInputs}
                                        error={advancedInputsError.active && advancedInputsError.id === 'PREMIUMTO'}
                                        helperText={advancedInputsError.active && advancedInputsError.id === 'PREMIUMTO' ? advancedInputsError.message : null}
                                    />
                                </Grid>
                                <Grid item sx={{ mr: 3, width: "30%", position: "absolute", right: "0", bottom: "0" }}>
                                    {advancedInputsError.active && !advancedInputsError.id ? (
                                    <Alert
                                        title={"Invalid Search"}
                                        message={advancedInputsError.message ? advancedInputsError.message : ""}
                                        severity={"error"}
                                        onClick={handleCloseGeneralError}
                                    />) : null}
                                </Grid>
                            </Grid>
                        </>
                </Collapse>
            </Stack>
        </Paper>
    );
}

export default Search;
