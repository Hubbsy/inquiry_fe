import React from 'react';
import { SearchInput } from '@aeros-ui/components';
import { Box } from '@mui/material';

const DeclCompanySearch = () => {
    return (
        <Box
            sx={{
                mx: 2
            }}>
            <SearchInput
                label='Search by Company Name, NAIC,...'
                width={100}
                onChange={() => {
                    console.log('');
                }}
            />
        </Box>
    );
};

export default DeclCompanySearch;
