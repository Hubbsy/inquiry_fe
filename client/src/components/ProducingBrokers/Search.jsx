import React from 'react';
import { Typography, Paper, styled } from '@mui/material';
import { SearchInput, SearchButton } from '@aeros-ui/components';

export default function Search() {
    const SearchBox = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: '15px 10px 15px 20px',
        margin: '15px 25px'
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
            <StyledSearchButton loading={false}>Search</StyledSearchButton>
        </SearchBox>
    );
}
