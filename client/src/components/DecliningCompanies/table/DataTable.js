import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { components } from './components';

const DataTable = ({ rows, loading }) => {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };
    return (
        <ThemeProvider theme={tableTheme}>
            <MaterialTable
                sx={{ m: 2 }}
                title={''}
                columns={columns}
                isLoading={loading}
                options={options(theme, ExportCsv, ExportPdf, showFilters, density, rows)}
                data={rows}
                components={components(
                    showFilters,
                    setFiltering,
                    handleDensityClick
                )}></MaterialTable>
        </ThemeProvider>
    );
};

DataTable.propTypes = {
    rowData: PropTypes.object,
    rows: PropTypes.array,
    loading: PropTypes.bool
};

export default DataTable;
