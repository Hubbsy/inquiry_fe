import React from 'react';
import { Typography, Grid, Tooltip, InputAdornment } from '@mui/material';
import { TextInput, CurrencyInput, Alert, ClearButton } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Clear } from '@mui/icons-material';
import { useRef } from 'react';

const TextItem = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    padding: theme.spacing(2)
}));

const AdvancedSearch = (props) => {
    const {
        applicationErrors,
        handleAdvancedSearchInputs,
        advancedSearch,
        handleAdvancedKeyPress,
        handleClearAdvSearchInput
    } = props;
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();
    const inputRef7 = useRef();
    const inputRef8 = useRef();

    // const handleInputBlur = (e) => {
    //     if (
    //         e.target.name === 'PREMIUMFROM' &&
    //         props.advancedSearch.PREMIUMFROM &&
    //         !props.advancedSearch.PREMIUMTO
    //     ) {
    //         if (props.applicationErrors.active) {
    //             props.resetAppErrors();
    //         }
    //         props.handleSearchInput({
    //             target: { name: 'PREMIUMTO', value: props.advancedSearch.PREMIUMFROM }
    //         });
    //     } else if (
    //         e.target.name === 'PREMIUMTO' &&
    //         props.advancedSearch.PREMIUMTO &&
    //         !props.advancedSearch.PREMIUMFROM
    //     ) {
    //         if (props.applicationErrors.active) {
    //             props.resetAppErrors();
    //         }
    //         props.handleSearchInput({
    //             target: { name: 'PREMIUMFROM', value: props.advancedSearch.PREMIUMTO }
    //         });
    //     }
    // };

    // const handleInputFocus = (e) => {
    //     if (
    //         props.advancedSearch.PREMIUMTO &&
    //         !props.advancedSearch.PREMIUMFROM &&
    //         e.target.name === 'PREMIUMFROM'
    //     ) {
    //         inputRef7.current.input.select();
    //     } else if (
    //         props.advancedSearch.PREMIUMFROM &&
    //         !props.advancedSearch.PREMIUMTO &&
    //         e.target.name === 'PREMIUMTO'
    //     ) {
    //         inputRef8.current.input.select();
    //     } else if (e.target.name === 'BATCH') {
    //         inputRef3.current.input.select();
    //     }
    // };

    // const handleKeyDown = (e) => {
    //     if (props.applicationErrors.active) {
    //         props.resetAppErrors();
    //     }
    //     const key = e.key.toLowerCase();
    //     if (key === 'enter') {
    //         props.handleSubmit();
    //     } else if (key === 'backspace' && !e.target.innerText) {
    //         if (e.target.name === 'PREMIUMFROM') {
    //             props.handleSearchInput({
    //                 target: { name: 'PREMIUMFROM', value: '' }
    //             });
    //         } else if (e.target.name === 'PREMIUMTO') {
    //             props.handleSearchInput({
    //                 target: { name: 'PREMIUMTO', value: '' }
    //             });
    //         }
    //     }
    // };

    // const handleChange = (e) => {
    //     if (props.applicationErrors.active) {
    //         props.resetAppErrors();
    //     }
    //     props.handleSearchInput(e);
    // };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant='subtitle1'>Advanced Search</Typography>
                </Grid>
                <Grid item>
                    <ClearButton
                        onClick={handleClearAdvSearchInput}
                        sx={{ height: '2em', width: '2em' }}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ flexGrow: 1 }} spacing={1}>
                <Grid item xs={2.5}>
                    <TextInput
                        inputRef={inputRef1}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('AFFIDAVITNUMBER');
                                                          inputRef1.current.focus();
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
                        inputRef={inputRef2}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('POLICYNUMBER');
                                                          inputRef2.current.focus();
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
                        inputRef={inputRef3}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('BATCH');
                                                          inputRef3.current.focus();
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
                        inputRef={inputRef4}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('INSUREDNAME');
                                                          inputRef4.current.focus();
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
                        inputRef={inputRef5}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('CONTACTNAME');
                                                          inputRef5.current.focus();
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
                        inputRef={inputRef6}
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
                                              <Tooltip title='clear' placement='top' arrow>
                                                  <Clear
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={() => {
                                                          handleClearInput('BROKERREFERENCE');
                                                          inputRef6.current.focus();
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
                            ref={inputRef7}
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
                            ref={inputRef8}
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
                </Grid>
            </Grid>
        </>
    );
};

export default AdvancedSearch;
