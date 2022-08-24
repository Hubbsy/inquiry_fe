import MaterialTable from '@material-table/core';
import { TablePagination, useTheme, styled, ThemeProvider } from '@mui/material';
import { TableToolbar, MainTableCell } from '@aeros-ui/tables';
import { tableTheme } from '@aeros-ui/themes';
import { useState } from 'react';

export default function Table({ rows }) {
    const theme = useTheme();
    const [density, setDensity] = useState('normal');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

    const columns = [
        {
            title: "License No.",
            field: "licenseNo",
            type: "string",
        },
        {
            title: "Name",
            field: "firstName",
            type: "string",
            render: rowData => (<MainTableCell>{rowData.firstName} {rowData.lastName}</MainTableCell>),
        },
        {
            title: "Effective Date",
            field: "effectiveDate",
            type: "date",
            align: "right"
        },
        {
            title: "Expiration Date",
            field: "expDate",
            type: "date",
            align: "right"
        },
    ];

    const options = {
        pageSize: 10,
        padding: density,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor: theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: 'capitalize',
            padding: "1em"
        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow === rowData.tableData.id
                    ? theme.palette.grid.main.active
                    : theme.palette.grid.main.default
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
                    columns={columns}
                    data={rows}
                    onRowClick={handleRowClick}
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
                                onFilterClick={() => setFiltering(false)}
                                onDensityClick={handleDensityClick}
                            />
                        )
                    }}
                />
            </ThemeProvider>
        </div>
    );
}
