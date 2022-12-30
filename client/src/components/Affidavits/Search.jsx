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
                    <>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography variant='subtitle1'>Advanced Search</Typography>
                            </Grid>
                            <Grid item>
                                <ClearButton
                                    onClick={clearAdvancedSearchInputs}
                                    sx={{ height: '2em', width: '2em' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ flexGrow: 1 }} spacing={1}>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={advancedSearch.AFFIDAVITNUMBER}
                                    label={'Search by Affidavit No'}
                                    name={'AFFIDAVITNUMBER'}
                                    onChange={handleAdvancedSearchInputs}
                                    onKeyPress={handleAdvancedKeyPress}
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('AFFIDAVITNUMBER')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('AFFIDAVITNUMBER')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.AFFIDAVITNUMBER.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput(
                                                                          'AFFIDAVITNUMBER'
                                                                      );
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
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
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('POLICYNUMBER')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('POLICYNUMBER')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.POLICYNUMBER.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput(
                                                                          'POLICYNUMBER'
                                                                      );
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
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
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('BATCH')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('BATCH')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.BATCH.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput('BATCH');
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
                                />
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={advancedSearch.INSUREDNAME}
                                    label={'Search by Insured Name'}
                                    name={'INSUREDNAME'}
                                    onChange={handleAdvancedSearchInputs}
                                    onKeyPress={handleAdvancedKeyPress}
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('INSUREDNAME')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('INSUREDNAME')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.INSUREDNAME.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput(
                                                                          'INSUREDNAME'
                                                                      );
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ flexGrow: 1, pt: 1 }} spacing={1}>
                            <Grid item xs={2.5}>
                                <TextInput
                                    width={'100%'}
                                    value={advancedSearch.CONTACTNAME}
                                    label={'Search by Batch Contact'}
                                    name={'CONTACTNAME'}
                                    onChange={handleAdvancedSearchInputs}
                                    onKeyPress={handleAdvancedKeyPress}
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('CONTACTNAME')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('CONTACTNAME')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.CONTACTNAME.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput(
                                                                          'CONTACTNAME'
                                                                      );
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
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
                                    error={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('BROKERREFERENCE')
                                    }
                                    helperText={
                                        applicationErrors.active &&
                                        applicationErrors.multipleInputs.includes('BROKERREFERENCE')
                                            ? applicationErrors.message
                                            : null
                                    }
                                    InputProps={
                                        advancedSearch.BROKERREFERENCE.length > 0
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position='end'>
                                                          <Tooltip
                                                              title='clear'
                                                              placement='top'
                                                              arrow>
                                                              <Clear
                                                                  sx={{ cursor: 'pointer' }}
                                                                  onClick={() => {
                                                                      handleClearInput(
                                                                          'BROKERREFERENCE'
                                                                      );
                                                                  }}
                                                                  fontSize='x-small'
                                                              />
                                                          </Tooltip>
                                                      </InputAdornment>
                                                  )
                                              }
                                            : {}
                                    }
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={4}
                                sx={{
                                    flexGrow: 1,
                                    position: 'relative',
                                    flexWrap: 'nowrap',
                                    top: '-3px'
                                }}>
                                <Grid item>
                                    <CurrencyInput
                                        label={'Premuim'}
                                        name={'PREMIUMFROM'}
                                        decimalPlaces={0}
                                        value={advancedSearch.PREMIUMFROM}
                                        onChange={handleAdvancedSearchInputs}
                                        error={
                                            applicationErrors.active &&
                                            applicationErrors.type === 'PREMIUMS' &&
                                            applicationErrors.el.pos === 'start'
                                        }
                                        helperText={
                                            applicationErrors.active &&
                                            applicationErrors.type === 'PREMIUMS' &&
                                            applicationErrors.el.pos === 'start'
                                                ? applicationErrors.message
                                                : null
                                        }
                                        sx={{
                                            ' .MuiInputBase-input-MuiInput-input.MuiInputBase-inputAdornedStart':
                                                {
                                                    padding: '4px 0 1px',
                                                    backgroundColor: 'red'
                                                }
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextItem>TO</TextItem>
                                </Grid>
                                <Grid item sx={{ mr: 3 }}>
                                    <CurrencyInput
                                        label={'Premium'}
                                        name={'PREMIUMTO'}
                                        decimalPlaces={0}
                                        value={advancedSearch.PREMIUMTO}
                                        onChange={handleAdvancedSearchInputs}
                                        error={
                                            applicationErrors.active &&
                                            applicationErrors.type === 'PREMIUMS' &&
                                            applicationErrors.el.pos === 'end'
                                        }
                                        helperText={
                                            applicationErrors.active &&
                                            applicationErrors.type === 'PREMIUMS' &&
                                            applicationErrors.el.pos === 'end'
                                                ? applicationErrors.message
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    sx={{
                                        mr: 3,
                                        width: '30%',
                                        position: 'absolute',
                                        right: '0',
                                        bottom: '0'
                                    }}>
                                    {applicationErrors.active &&
                                    applicationErrors.multipleInputs.length < 1 &&
                                    applicationErrors.type === 'ADVANCED' ? (
                                        <Alert
                                            title={'Invalid Search'}
                                            message={
                                                applicationErrors.message
                                                    ? applicationErrors.message
                                                    : ''
                                            }
                                            severity={'error'}
                                            onClick={handleCloseGeneralError}
                                        />
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                </Collapse>
            </Stack>
        </Paper>
    );
}

export default Search;
