import { Box, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { SelectInput } from '@aeros-ui/components';

const DeclCompanyOrg = ({ organization }) => {
    const [selectOrg, setSelectOrg] = useState(' ');

    return (
        <Box
            sx={{
                mx: 2
            }}>
            <SelectInput
                label='Organization Type'
                onChange={(e) => {
                    console.log(`org: ${e.target.value}`);
                    setSelectOrg(e.target.value);
                }}
                value={selectOrg}
                width={300}>
                {organization.map((org) => {
                    return (
                        <MenuItem key={org.code} value={org.code}>
                            {org.description}
                        </MenuItem>
                    );
                })}
            </SelectInput>
        </Box>
    );
};

DeclCompanyOrg.propTypes = {
    organization: PropTypes.array
};

export default DeclCompanyOrg;
