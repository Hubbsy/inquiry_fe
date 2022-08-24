import { Box, MenuItem } from '@mui/material';
import React from 'react';
import { SelectInput } from '@aeros-ui/components';

const DeclCompanyOrg = () => {
    return (
        <Box
            sx={{
                mx: 2
            }}>
            <SelectInput label='Organization Type' onChange={() => {}} value=' ' width='100px'>
                <MenuItem>something</MenuItem>
            </SelectInput>
        </Box>
    );
};

export default DeclCompanyOrg;
