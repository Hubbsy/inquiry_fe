import MaterialTable, { MTableBodyRow, MTableCell } from '@material-table/core';
import { TablePagination, useTheme, ThemeProvider, Grid, Typography } from '@mui/material';
import { TableToolbar, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme } from '@aeros-ui/themes';
import { useState, useCallback, createRef } from 'react';
import { Stack } from '@mui/system';
import columns from './columns';
import { useEffect } from 'react';

export default function Table({ loading, rows }) {
    const theme = useTheme();
    const tableRef = createRef();
    const [density, setDensity] = useState('dense');
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

    const [Columns, setColumns] = useState([...columns(handlePopoverOpen)]);

    useEffect(() => {
        if (rows.length > 0 && !loading) {
            resetTableState();
        }
    }, [rows]);

    const resetTableState = () => {
        // showFilters ? setFiltering(false) : null;
        tableRef && tableRef.current ? (tableRef.current.dataManager.searchText = '') : null;
        setColumns([...columns(handlePopoverOpen)]);
    };

    const handleFilterAction = () => {
        tableRef.current.dataManager.searchText = '';
        setFiltering(!showFilters);
        const columnsCopy = [...Columns];
        if (showFilters) {
            for (const col of columnsCopy) {
                col.tableData.filterValue = '';
            }
            setColumns(columnsCopy);
        }
    };

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
        pageSizeOptions: [5, 10, 25, 50, 100],
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
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Life Brokers Inquiry')
            },
            {
                label: 'Export as CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Life Brokers Inquiry')
            }
        ],
        columnsButton: true,
        filtering: showFilters,
        searchFieldStyle: { marginRight: '1em' },
        emptyRowsWhenPaging: rows.length ? false : true
    };

    return (
        <div style={{ margin: '1em' }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    tableRef={tableRef}
                    options={options}
                    columns={Columns}
                    data={rows}
                    isLoading={loading}
                    onRowClick={handleRowClick}
                    components={{
                        Cell: (props) => {
                            return (
                                <MTableCell
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                    {...props}></MTableCell>
                            );
                        },
                        Row: (props) => {
                            return <MTableBodyRow id={props.data.id} {...props} />;
                        },

                        Toolbar: (props) => (
                            <TableToolbar
                                {...props}
                                showFilters={showFilters}
                                onFilterClick={handleFilterAction}
                                onDensityClick={handleDensityClick}
                            />
                        ),
                        Pagination: (props) => (
                            <TablePagination {...props} page={props.count <= 0 ? 0 : props.page} />
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
