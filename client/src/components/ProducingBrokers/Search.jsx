import React from 'react';
import { Typography, Paper, styled } from '@mui/material';
import { SearchInput, SearchButton } from '@aeros-ui/components';

export default function Search({ onShowRows }) {
    const SearchBox = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: '1em',
        margin: '1em'
    }));

    const StyledSearchButton = styled(SearchButton)(({ theme }) => ({
        marginLeft: 20,
        marginTop: 5
    }));

    return (
        <SearchBox variant={'outlined'}>
            <Typography
                variant='h6'
                sx={{
                    paddingBottom: 1
                }}
            >
                Producing Brokers Inquiry
            </Typography>
            <SearchInput
                sx={{ marginRight: 5 }}
                label={'Search by License No, Broker name...'}
                onChange={() => {}}
                value={''}
                width={'40%'}
            />
            <StyledSearchButton loading={false} onClick={onShowRows}>Search</StyledSearchButton>
        </SearchBox>
    );
}
