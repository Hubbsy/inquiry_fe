import React, { useRef } from 'react';
import {
    Typography,
    Paper,
    Grid,
    Tooltip,
    Stack,
    Collapse,
    Fab,
    InputAdornment
} from '@mui/material';
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
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { Clear } from '@mui/icons-material';
import { useFormCtrl } from '../../hooks/Affidavits/useFormCtrl';
import AdvancedSearch from './AdvSearch';
import { isAfter, isValid } from 'date-fns';

const TextItem = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
}));

function Search(props) {
    const {
        loading,
        applicationErrors,
        handleHelperText,
        advancedSearchActive,
        toggleAdvancedSearchPanel,
        standardSearch,
        handleAdvancedSearchInputs,
        handleAdvancedKeyPress,
        handleCloseGeneralError,
        getAffidavits,
        token,
        endpoint,
        handleErrorMessages,
        resetAppErrors
    } = props;

    const searchInputRef = useRef();
    const startDateErrorActive =
        applicationErrors.active &&
        applicationErrors.type === 'DATES' &&
        applicationErrors.el.pos === 'start';
    const endDateErrorActive =
        applicationErrors.active &&
        applicationErrors.type === 'DATES' &&
        applicationErrors.el.pos === 'end';

    const {
        comboSearch,
        startDate,
        endDate,
        advancedSearch,
        handleClearAdvSearch,
        handleClearAdvSearchInput,
        setStartDate,
        setEndDate,
        handleSearchInput,
        handleSubmit,
        handleClearCombo
    } = useFormCtrl(
        advancedSearchActive,
        endpoint,
        token,
        getAffidavits,
        applicationErrors,
        handleErrorMessages,
        resetAppErrors
    );

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        if (applicationErrors.active) {
            props.resetAppErrors();
        }

        handleSearchInput(e);
    };

    const setStartDateInput = (e) => {
        let startDateError = null;
        let errorType = null;

        if (e === null) {
            setStartDate(e);
            return resetAppErrors();
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (endDate !== null && isAfter(e, endDate)) {
                    errorType = 'DATES';
                    startDateError = { type: 'range', pos: 'start' };
                }
            } else {
                errorType = 'DATES';
                startDateError = { type: 'valid', pos: 'start' };
            }

            if (errorType) {
                handleErrorMessages(errorType, startDateError);
                setStartDate(e);
            } else {
                if (!endDate) {
                    setEndDate(e);
                }
                setStartDate(e);
                resetAppErrors();
            }
        } else {
            handleErrorMessages('DATES', { type: 'valid', pos: 'start' });
        }
    };

    const setEndDateInput = (e) => {
        let endDateError = null;
        let errorType = null;

        if (e === null) {
            setEndDate(e);
            return resetAppErrors();
        }

        if (isValid(e)) {
            const date = e.toLocaleDateString('en-GB').split('/').reverse().join('-');
            if (date.length === 10) {
                if (isAfter(startDate, e)) {
                    errorType = 'DATES';
                    endDateError = { type: 'range', pos: 'end' };
                }
            } else {
                errorType = 'DATES';
                endDateError = { type: 'valid', pos: 'end' };
            }

            if (errorType) {
                handleErrorMessages(errorType, endDateError);
                setEndDate(e);
            } else {
                if (!startDate) {
                    setStartDate(e);
                }
                setEndDate(e);
                resetAppErrors();
            }
        }
    };

    return (
        <Paper
            sx={{
                padding: '1em',
                margin: '0.5em'
            }}
            variant={'outlined'}>
            <Grid item container alignItems='center'>
                <Grid item xs={6}>
                    <Typography variant='h6' gutterBottom>
                        Affidavit Inquiry
                    </Typography>
                </Grid>
                <Grid item container justifyContent='flex-end' xs={6}>
                    {props.applicationErrors.active &&
                    props.applicationErrors.type === 'GENERAL' ? (
                        <Alert severity='error' message={props.applicationErrors.message} />
                    ) : null}
                </Grid>
            </Grid>
            <Stack>
                <Grid sx={{ flexGrow: 1, flexWrap: 'nowrap' }} container spacing={0.5}>
                    <Grid item xs={5}>
                        <SearchInput
                            inputRef={searchInputRef}
                            autoFocus
                            sx={{ mr: 1 }}
                            includeEndAdornment={true}
                            label={'Search by Affidavit No or Policy No...'}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onClick={resetAppErrors}
                            value={comboSearch}
                            name={'COMBOSEARCH'}
                            width={'97%'}
                            error={
                                applicationErrors.active && applicationErrors.type === 'COMBOSEARCH'
                            }
                            helperText={
                                applicationErrors.active && applicationErrors.type === 'COMBOSEARCH'
                                    ? applicationErrors.message
                                    : null
                            }
                            disabled={
                                advancedSearchActive ||
                                (applicationErrors.active &&
                                    applicationErrors.type === 'SINGLE_SEARCH')
                            }
                            handleClearInput={() => {
                                handleClearCombo();
                                searchInputRef.current.focus();
                            }}
                        />
                        {applicationErrors.active && applicationErrors.type === 'SINGLE_SEARCH' ? (
                            <Typography variant='caption' color='info.main'>
                                {applicationErrors.active ? applicationErrors.message : ''}
                            </Typography>
                        ) : null}
                    </Grid>
                    <Grid item>
                        <DateInput
                            label={'Inception Date'}
                            onChange={setStartDateInput}
                            value={startDate}
                            name={'startDate'}
                            helperText={startDateErrorActive ? applicationErrors.message : null}
                        />
                    </Grid>
                    <Grid item>
                        <TextItem>TO</TextItem>
                    </Grid>
                    <Grid item sx={{ mr: 3 }}>
                        <DateInput
                            label={'Expiration Date'}
                            onChange={setEndDateInput}
                            value={endDate}
                            name={'endDate'}
                            helperText={endDateErrorActive ? applicationErrors.message : null}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 1, mr: 3 }}>
                        <SearchButton sx={{ ml: 1 }} loading={loading} onClick={handleSubmit}>
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
                <Collapse in={advancedSearchActive} width={'100%'}>
                    <AdvancedSearch
                        applicationErrors={applicationErrors}
                        advancedSearch={advancedSearch}
                        handleAdvancedSearchInputs={handleAdvancedSearchInputs}
                        handleAdvancedKeyPress={handleAdvancedKeyPress}
                        handleCloseGeneralError={handleCloseGeneralError}
                        handleClearAdvSearchInput={handleClearAdvSearchInput}
                    />
                </Collapse>
            </Stack>
        </Paper>
    );
}

export default Search;
