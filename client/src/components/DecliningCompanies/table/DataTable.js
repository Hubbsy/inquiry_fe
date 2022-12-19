import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { components } from './components';
import isEmpty from '../../../functions/isEmpty';

const DataTable = ({ rows, loading }) => {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);
    const [columnState, setColumnState] = useState([...columns([])]);
    const tableRef = createRef();

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleFilterAction = () => {
        let hiddenList = [];
        for (const column of tableRef.current.dataManager.columns) {
            hiddenList.push(column.hidden);
        }

        setColumnState([...columns(hiddenList)]);

        setFiltering(!showFilters);
    };

    useEffect(() => {
        if (!isEmpty(rows) && !loading) {
            setColumnState([...columns([])]);
        }
    }, [rows]);

    return (
        <ThemeProvider theme={tableTheme}>
            <MaterialTable
                title={''}
                tableRef={tableRef}
                style={{ margin: '1em' }}
                columns={columnState}
                isLoading={loading}
                options={options(theme, ExportCsv, ExportPdf, showFilters, density, rows)}
                data={rows}
                components={components(
                    showFilters,
                    handleFilterAction,
                    handleDensityClick
                )}></MaterialTable>
        </ThemeProvider>
    );
};

DataTable.propTypes = {
    rows: PropTypes.array,
    loading: PropTypes.bool
};

export default DataTable;
