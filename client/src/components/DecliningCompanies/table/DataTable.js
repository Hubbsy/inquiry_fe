import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableCell } from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme, theme } from '@aeros-ui/themes';
import { TableToolbar } from '@aeros-ui/tables';
import { Box, TablePagination } from '@mui/material';

const DataTable = ({ rows }) => {
    {
        {
            console.log(rows);
        }
    }
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
                    options={{
                        ...options,
                        cellStyle: theme.typography,
                        headerStyle: {
                            ...theme.components.headerStyle,
                            backgroundColor: theme.palette.grid.main.header,
                            padding: '1em'
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
                        padding: density
                    }}
                    data={rows}
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
                        Cell: (props) => {
                            console.log(props);
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
                        // Row: (props) => <MTableBodyRow {...props} />,
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
    rows: PropTypes.array
};

export default DataTable;
