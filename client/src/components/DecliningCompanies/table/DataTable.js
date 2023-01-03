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

const DataTable = ({ compData, declLoading, declData }) => {
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

    const handleOrgType = (type) => {
        for (const comp in compData) {
            if (type === compData[comp].CODE) {
                return compData[comp].DESCRIPTION;
            }
        }
    };

    useEffect(() => {
        if (declData && !declLoading) {
            resetTableState();
            if (JSON.stringify(declData).includes('NODATA')) {
                setData([]);
            } else {
                const declDataCopy = [...declData];
                for (const data of declDataCopy) {
                    data.ORGTYPE = handleOrgType(data.ORGTYPE);
                }
                setData(declDataCopy);
            }
        }
    }, [declData]);

    const [columnState, setColumnState] = useState(columns);

    return (
        <ThemeProvider theme={tableTheme}>
            {/* {console.log(compData)} */}
            <MaterialTable
                title={''}
                columns={columnState}
                tableRef={tableRef}
                style={{ margin: '1em' }}
                isLoading={declLoading}
                options={options(theme, ExportCsv, ExportPdf, showFilters, density, data)}
                data={data}
                components={components(showFilters, handleFilterAction, handleDensityClick)}
            ></MaterialTable>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        declLoading: state.decliningCompanies.decliningData.loading,
        declData: state.decliningCompanies.decliningData.data,
        declError: state.decliningCompanies.decliningData.error,
        compData: state.decliningCompanies.companies.data
    };
};

export default connect(mapStateToProps, null)(DataTable);
