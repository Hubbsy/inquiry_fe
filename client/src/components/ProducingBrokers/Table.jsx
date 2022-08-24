import MaterialTable from '@material-table/core';
import { TablePagination, useTheme, styled, ThemeProvider } from '@mui/material';
import { TableToolbar } from '@aeros-ui/tables';
import { tableTheme } from '@aeros-ui/themes';
import { useState } from 'react';

export default function Table() {
    const theme = useTheme();
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const options = {
        pageSize: 10,
        padding: density,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor: theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: 'capitalize'
        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow === rowData.tableData.id
                    ? theme.palette.success.light
                    : theme.palette.background.paper
        }),
        exportAllData: true,
        exportMenu: [
            {
                label: 'Export as PDF',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Producing Brokers Data')
            },
            {
                label: 'Export as CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Producing Brokers Data')
            }
        ],
        columnsButton: true,
        filtering: showFilters
    };

    return (
        <div style={{ margin: '1em' }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    options={options}
                    components={{
                        Pagination: (props) => (
                            <TablePagination
                                count={props.count}
                                page={props.page}
                                onPageChange={props.onPageChange}
                                rowsPerPage={props.rowsPerPage}
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                onRowsPerPageChange={props.onRowsPerPageChange}
                            />
                        ),
                        Toolbar: (props) => (
                            <TableToolbar
                                {...props}
                                showFilters={showFilters}
                                onFilterClick={() => setFiltering(!showFilters)}
                                onDensityClick={handleDensityClick}
                            />
                        )
                    }}
                />
            </ThemeProvider>
        </div>
    );
}
