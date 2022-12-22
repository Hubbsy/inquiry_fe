import React, { createRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { components } from './components';
import { MainTableCell } from '@aeros-ui/tables';
import { connect } from 'react-redux';

const DataTable = ({ handleOrgType, compData, declLoading, declData, declError }) => {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);
    const [data, setData] = useState([]);
    const tableRef = createRef();

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleFilterAction = () => {
        let hiddenList = [];
        tableRef.current.dataManager.searchText = '';
        for (const column of tableRef.current.dataManager.columns) {
            hiddenList.push(column.hidden);
        }

        setColumnState([...columns(hiddenList, handleOrgType)]);

        setFiltering(!showFilters);
    };

    useEffect(() => {
        if (declData && !declLoading) {
            tableRef.current.dataManager.searchText = '';
            setColumnState([...columns([], handleOrgType)]);
            setData(declData);
        }
    }, [declData]);

    const [columnState, setColumnState] = useState([...columns([], handleOrgType)]);

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
