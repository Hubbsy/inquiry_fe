import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableCell, MTableHeader } from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { TableToolbar } from '@aeros-ui/tables';
import { Box, TablePagination } from '@mui/material';

const DataTable = ({ rows, loading }) => {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };
    return (
        <ThemeProvider theme={tableTheme}>
            <Box sx={{ m: 2 }}>
                <MaterialTable
                    title=''
                    columns={columns}
                    isLoading={loading}
                    options={{
                        ...options,
                        emptyRowsWhenPaging: rows.length ? false : true,
                        cellStyle: theme.typography,
                        headerStyle: {
                            ...theme.components.headerStyle,
                            backgroundColor: theme.palette.grid.main.header,
                            padding: '0.7em 2em'
                        },
                        exportMenu: [
                            {
                                label: 'Export PDF',
                                exportFunc: (cols, datas) =>
                                    ExportPdf(cols, datas, 'Declining Companies Inquiry')
                            },
                            {
                                label: 'Export CSV',
                                exportFunc: (cols, datas) =>
                                    ExportCsv(cols, datas, 'Declining Companies Inquiry')
                            }
                        ],
                        filtering: showFilters,
                        padding: density,
                        initialPage: 0,
                        pageSize: 10,
                        pageSizeOptions: [10,25,50,100],
                        paginationType: 'normal',
                    }}
                    data={rows}
                    components={{
                        // Header: (props) => (
                        //     <MTableHeader
                        //         style={{
                        //             alignItems: 'center',
                        //             display: 'flex',
                        //             justifyContent: 'center'
                        //         }}
                        //         {...props}
                        //     />
                        // ),
                        // Pagination: (props) => (
                        //     <TablePagination
                        //         count={props.count}
                        //         page={props.page}
                        //         onPageChange={props.onPageChange}
                        //         rowsPerPage={props.rowsPerPage}
                        //         rowsPerPageOptions={[10, 25, 50, 100]}
                        //         onRowsPerPageChange={props.onRowsPerPageChange}
                        //     />
                        // ),
                        Cell: (props) => {
                            return (
                                <MTableCell
                                    style={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                    {...props}></MTableCell>
                            );
                        },
                        Toolbar: (props) => (
                            <TableToolbar
                                {...props}
                                showFilters={showFilters}
                                onFilterClick={() => setFiltering(!showFilters)}
                                onDensityClick={handleDensityClick}
                            />
                        )
                    }}></MaterialTable>
            </Box>
        </ThemeProvider>
    );
};

DataTable.propTypes = {
    rowData: PropTypes.object,
    rows: PropTypes.array,
    loading: PropTypes.bool
};

export default DataTable;
