import { Typography, Paper, Grid, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { SearchInput, SearchButton } from '@aeros-ui/components';
import { useRef } from 'react';

function Search({
    loading,
    errorStyle,
    searchValue,
    handleChange,
    handleKeyPress,
    showRows,
    handleClearInput,
    handleHelperText,
    userGuideURL
}) {
    const searchInputRef = useRef();

    return (
        <Paper sx={{ padding: '1em', margin: '1em' }} variant={'outlined'}>
            <Grid
                item
                container
                justifyContent='space-between'
                alignItems='center'
                sx={{ pb: '0.5em' }}
            >
                <Grid item>
                    <Typography variant='h6'>Producing Brokers Inquiry</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        color='primary'
                        component='a'
                        target='_blank'
                        rel='noopenner noreferrer'
                        href={
                            userGuideURL !== null
                                ? `https://${userGuideURL}/inquiry/producing-brokers`
                                : `${window.location.origin}/inquiry/error`
                        }
                        tabIndex={-1}
                        size='small'
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                <Grid item xs={5}>
                    <SearchInput
                        autoFocus
                        sx={{ mr: 1 }}
                        inputRef={searchInputRef}
                        label={'Search by License No, Broker Name...'}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        onClick={handleHelperText}
                        value={searchValue}
                        width={'97%'}
                        error={errorStyle}
                        helperText={errorStyle ? 'Must be at least 3 characters' : null}
                        includeEndAdornment={true}
                        handleClearInput={() => {
                            handleClearInput();
                            searchInputRef.current.focus();
                        }}
                    />
                </Grid>
                <Grid sx={{ mt: 1 }} item xs={2}>
                    <SearchButton sx={{ ml: 1 }} loading={loading} onClick={showRows}>
                        Search
                    </SearchButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Search;
