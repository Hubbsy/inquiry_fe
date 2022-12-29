import React, { createRef, useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { components } from './components';
import { connect } from 'react-redux';
import { useFilter } from '../../../hooks/utility/useFilter';

const DataTable = ({ handleOrgType, declLoading, declData }) => {
    const [density, setDensity] = useState('dense');
    const { showFilters, handleFilter } = useFilter();
    const [data, setData] = useState([]);
    const tableRef = createRef();

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleFilterAction = () => {
        tableRef.current.dataManager.searchText = '';
        handleFilter();
        const columnsCopy = [...columnState];
        if (showFilters) {
            for (const col of columnsCopy) {
                col.tableData.filterValue = '';
            }
            setColumnState(columnsCopy);
        }
    };

    const resetTableState = () => {
        showFilters ? handleFilter() : null;
        tableRef.current.dataManager.searchText = '';
        const columnsCopy = [...columnState];
        for (const col of columnsCopy) {
            if (col.hidden === true) {
                col.hidden = false;
            }

            col.tableData.filterValue = '';
        }
        setColumnState(columnsCopy);
    };

    useEffect(() => {
        if (declData && !declLoading) {
            resetTableState();
            if (JSON.stringify(declData).includes('NODATA')) {
                setData([]);
            } else {
                setData(declData);
            }
        }
    }, [declData]);

    const [columnState, setColumnState] = useState([...columns(handleOrgType)]);

    return (
        <ThemeProvider theme={tableTheme}>
            <MaterialTable
                title={''}
                columns={columnState}
                tableRef={tableRef}
                style={{ margin: '1em' }}
                isLoading={declLoading}
                options={options(theme, ExportCsv, ExportPdf, showFilters, density, data)}
                data={data}
                components={components(
                    showFilters,
                    handleFilterAction,
                    handleDensityClick
                )}></MaterialTable>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        declLoading: state.decliningCompanies.decliningData.loading,
        declData: state.decliningCompanies.decliningData.data,
        declError: state.decliningCompanies.decliningData.error
    };
};

export default connect(mapStateToProps, null)(DataTable);
