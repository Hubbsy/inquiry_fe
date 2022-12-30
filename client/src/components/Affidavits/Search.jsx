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

import AdvancedSearch from './AdvSearch';

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
    advancedSearchActive,
    toggleAdvancedSearchPanel,
    handleFromDateInput,
    handleToDateInput,
    standardSearch,
    handleAdvancedSearchInputs,
    advancedSearch,
    handleAdvancedKeyPress,
    handleCloseGeneralError,
    clearAdvancedSearchInputs
}) {
    const searchInputRef = useRef();

    return (
        <Paper
            sx={{
                padding: '1em',
                margin: '0.5em'
            }}
            variant={'outlined'}>
            <Typography variant='h6' sx={{ paddingBottom: 1 }}>
                Affidavit Inquiry
            </Typography>
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
                            onKeyPress={handleKeyPress}
                            onClick={handleHelperText}
                            value={searchValue}
                            width={'97%'}
                            error={
                                applicationErrors.active && applicationErrors.type === 'STANDARD'
                            }
                            helperText={
                                applicationErrors.active && applicationErrors.type === 'STANDARD'
                                    ? applicationErrors.message
                                    : null
                            }
                            disabled={
                                advancedSearchActive ||
                                (applicationErrors.active &&
                                    applicationErrors.type === 'SINGLE_SEARCH')
                            }
                            handleClearInput={() => {
                                handleClearInput();
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
                            onChange={handleFromDateInput}
                            value={
                                applicationErrors.active &&
                                applicationErrors.type === 'DATES' &&
                                applicationErrors.el.pos === 'start'
                                    ? ''
                                    : standardSearch.INCEPTIONFROM
                            }
                            helperText={
                                applicationErrors.active &&
                                applicationErrors.type === 'DATES' &&
                                applicationErrors.el.pos === 'start'
                                    ? applicationErrors.message
                                    : null
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextItem>TO</TextItem>
                    </Grid>
                    <Grid item sx={{ mr: 3 }}>
                        <DateInput
                            label={'Inception Date'}
                            onChange={handleToDateInput}
                            value={
                                applicationErrors.active &&
                                applicationErrors.type === 'DATES' &&
                                applicationErrors.el.pos === 'end'
                                    ? ''
                                    : standardSearch.INCEPTIONTO
                            }
                            helperText={
                                applicationErrors.active &&
                                applicationErrors.type === 'DATES' &&
                                applicationErrors.el.pos === 'end'
                                    ? applicationErrors.message
                                    : null
                            }
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
                <Collapse in={advancedSearchActive} width={'100%'}>
                    <AdvancedSearch
                        applicationErrors={applicationErrors}
                        advancedSearch={advancedSearch}
                        handleAdvancedSearchInputs={handleAdvancedSearchInputs}
                        handleAdvancedKeyPress={handleAdvancedKeyPress}
                        handleCloseGeneralError={handleCloseGeneralError}
                        clearAdvancedSearchInputs={clearAdvancedSearchInputs}
                        handleClearInput={handleClearInput}
                    />
                </Collapse>
            </Stack>
        </Paper>
    );
}

export default Search;
