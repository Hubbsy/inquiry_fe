import React from 'react';
import { Typography, Grid } from '@mui/material';
import { CurrencyInput, ClearButton, ClearableInput, NumberInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
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
        handleClearAdvSearchInput,
        handleSearchInput,
        handleSubmit,
        resetAppErrors,
        loading
    } = props;

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();
    const inputRef7 = useRef();
    const inputRef8 = useRef();

    const handleInputBlur = (e) => {
        if (
            e.target.name === 'PREMIUMFROM' &&
            advancedSearch.PREMIUMFROM &&
            !advancedSearch.PREMIUMTO
        ) {
            if (applicationErrors.active) {
                resetAppErrors();
            }
            handleSearchInput({
                target: { name: 'PREMIUMTO', value: advancedSearch.PREMIUMFROM }
            });
        } else if (
            e.target.name === 'PREMIUMTO' &&
            advancedSearch.PREMIUMTO &&
            !advancedSearch.PREMIUMFROM
        ) {
            if (applicationErrors.active) {
                resetAppErrors();
            }
            handleSearchInput({
                target: { name: 'PREMIUMFROM', value: advancedSearch.PREMIUMTO }
            });
        }
    };

    const handleInputFocus = (e) => {
        if (
            advancedSearch.PREMIUMTO &&
            !advancedSearch.PREMIUMFROM &&
            e.target.name === 'PREMIUMFROM'
        ) {
            inputRef7.current.input.select();
        } else if (
            advancedSearch.PREMIUMFROM &&
            !advancedSearch.PREMIUMTO &&
            e.target.name === 'PREMIUMTO'
        ) {
            inputRef8.current.input.select();
        } else if (e.target.name === 'BATCH') {
            inputRef3.current.input.select();
        }
    };

    const handleKeyDown = (e) => {
        if (applicationErrors.active) {
            resetAppErrors();
        }
        const key = e.key.toLowerCase();
        if (key === 'enter' && !loading) {
            handleSubmit();
        } else if (key === 'backspace' && !e.target.innerText) {
            if (e.target.name === 'PREMIUMFROM') {
                handleSearchInput({
                    target: { name: 'PREMIUMFROM', value: '' }
                });
            } else if (e.target.name === 'PREMIUMTO') {
                handleSearchInput({
                    target: { name: 'PREMIUMTO', value: '' }
                });
            }
        }
    };

    const handleChange = (e) => {
        if (applicationErrors.active) {
            resetAppErrors();
        }
        handleSearchInput(e);
    };

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
                    <ClearableInput
                        width={'100%'}
                        inputRef={inputRef1}
                        value={advancedSearch.AFFIDAVITNUMBER}
                        label={'Search by Affidavit No'}
                        name={'AFFIDAVITNUMBER'}
                        onChange={handleChange}
                        onKeyPress={handleKeyDown}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'AFFIDAVITNUMBER');
                            inputRef1.current.focus();
                        }}
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
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <ClearableInput
                        width={'100%'}
                        inputRef={inputRef2}
                        value={advancedSearch.POLICYNUMBER}
                        label={'Search by Policy No'}
                        name={'POLICYNUMBER'}
                        onChange={handleChange}
                        onKeyPress={handleKeyDown}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'POLICYNUMBER');
                            inputRef2.current.focus();
                        }}
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
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <NumberInput
                        label={'Search by Batch'}
                        name={'BATCH'}
                        ref={inputRef3}
                        decimalPlaces={0}
                        value={advancedSearch.BATCH}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        width={'100%'}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'BATCH');
                            inputRef3.current ? inputRef3.current.input.focus() : null;
                        }}
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
                        inputProps={{
                            onFocus: handleInputFocus,
                            sx: { pt: 0.15 }
                        }}
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <ClearableInput
                        width={'100%'}
                        inputRef={inputRef4}
                        value={advancedSearch.INSUREDNAME}
                        label={'Search by Insured Name'}
                        name={'INSUREDNAME'}
                        onChange={handleChange}
                        onKeyPress={handleKeyDown}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'INSUREDNAME');
                            inputRef4.current.focus();
                        }}
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
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ flexGrow: 1, pt: 1 }} spacing={1}>
                <Grid item xs={2.5}>
                    <ClearableInput
                        width={'100%'}
                        inputRef={inputRef5}
                        value={advancedSearch.CONTACTNAME}
                        label={'Search by Batch Contact'}
                        name={'CONTACTNAME'}
                        onChange={handleChange}
                        onKeyPress={handleKeyDown}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'CONTACTNAME');
                            inputRef5.current.focus();
                        }}
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
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <ClearableInput
                        width={'100%'}
                        inputRef={inputRef6}
                        value={advancedSearch.BROKERREFERENCE}
                        label={'Search by Reference'}
                        name={'BROKERREFERENCE'}
                        onChange={handleChange}
                        onKeyPress={handleKeyDown}
                        handleClearInput={(e) => {
                            handleClearAdvSearchInput(e, 'BROKERREFERENCE');
                            inputRef6.current.focus();
                        }}
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
                            ref={inputRef7}
                            decimalPlaces={0}
                            value={advancedSearch.PREMIUMFROM}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
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
                            inputProps={{
                                onBlur: handleInputBlur,
                                onFocus: handleInputFocus
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
                            ref={inputRef8}
                            decimalPlaces={0}
                            value={advancedSearch.PREMIUMTO}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
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
                            inputProps={{
                                onBlur: handleInputBlur,
                                onFocus: handleInputFocus
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AdvancedSearch;
