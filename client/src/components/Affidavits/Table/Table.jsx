import MaterialTable from '@material-table/core';
import { TablePagination, useTheme, ThemeProvider, Grid, Typography } from '@mui/material';
import { TableToolbar, MainTableCell, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme } from '@aeros-ui/themes';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';
import { Stack } from '@mui/system';
import Columns from './columns';

export default function Table({ loading, rows, adjustPadding }) {
    const theme = useTheme();
    const [density, setDensity] = useState('normal');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [currentRowData, setCurrentRowData] = useState({
        licenseNo: 'no current license No.',
        address: 'no current address'
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    };

    const compileFullAddress = (options) => {
        return {
            line1: `${options.address1} ${options.address2} ${options.address3}`,
            line2: `${options.city}, ${options.state}, ${options.zip}`
        };
    };

    const handlePopoverOpen = useCallback((event, rowData) => {
        setSelectedRow(rowData.tableData.id);
        setCurrentRowData({
            licenseNo: rowData.licenseNo,
            address: compileFullAddress(rowData.address)
        });
        const anchorPosition = anchorPositionByAnchorEl(event);
        setAnchorEl(anchorPosition);
    }, []);

    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const anchorPositionByAnchorEl = (event) => {
        const elementDetailedPosition = event.currentTarget.getBoundingClientRect();
        const anchorPosition = {
            left: elementDetailedPosition.left + elementDetailedPosition.width / 2,
            top: elementDetailedPosition.top + elementDetailedPosition.height
        };
        return anchorPosition;
    };

    const content = (
        <Grid container>
            <Grid item container>
                <Typography variant='subtitle2' gutterBottom>
                    Address:
                </Typography>
            </Grid>
            <Grid item container>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.address.line1}
                    </Typography>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.address.line2}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );

    const columns = Columns(handlePopoverOpen);

    const options = {
        pageSize: 10,
        padding: density,
        showEmptyDataSourceMessage: !loading,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor: theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: 'capitalize',
            padding: '1em',
            whiteSpace: 'nowrap'
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
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Affidavit Data')
            },
            {
                label: 'Export as CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, ' Data')
            }
        ],
        columnsButton: true,
        filtering: showFilters,
        searchFieldStyle: { marginRight: '1em' },
        emptyRowsWhenPaging: rows.length ? false : true
    };

    return (
        <div style={{ marginTop: "1em", marginRight: `${adjustPadding ? "0.10em" : "1em"}`, marginLeft: "1em", marginBottom: "1em"  }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    options={options}
                    columns={columns}
                    data={rows}
                    isLoading={loading}
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
                                onFilterClick={() => setFiltering(!showFilters)}
                                onDensityClick={handleDensityClick}
                            />
                        )
                    }}
                />
                <DetailCard
                    popoverId='detailPopover'
                    open={popoverOpen}
                    anchorPosition={anchorEl}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    handleClose={handlePopoverClose}
                    width={300}
                    title={`License No. ${currentRowData.licenseNo}`}
                    content={content}
                />
            </ThemeProvider>
        </div>
    );
}
