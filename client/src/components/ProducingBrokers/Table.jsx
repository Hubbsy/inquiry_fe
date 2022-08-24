import MaterialTable from '@material-table/core';
import { TablePagination, useTheme, styled, ThemeProvider, Grid, Chip, IconButton, Popover, Typography, CardHeader, CardContent } from '@mui/material';
import { TableToolbar, MainTableCell } from '@aeros-ui/tables';
import { tableTheme } from '@aeros-ui/themes';
import { useState } from 'react';
import { MoreVert } from "@mui/icons-material";

export default function Table({ rows }) {
    const theme = useTheme();
    const [density, setDensity] = useState('normal');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'menu-popover' : undefined;
    const [yTarget, setYTarget] = useState(0)
    const [xTarget, setXTarget] = useState(0)

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

    const handleOpenPopover = (e, rowData) => {
        setYTarget(e.pageY)
        setXTarget(e.pageX)
        setAnchorEl(e.currentTarget);
        setSelectedRow(rowData);
    }

    const handleClosePopover = () => {
        setAnchorEl(null)
        setSelectedRow(null)
    }
    

    const columns = [
        {
            title: "License No.",
            field: "licenseNo",
            type: "string",
            render: rowData => (<MainTableCell>{rowData.licenseNo}</MainTableCell>),
        },
        {
            title: "Name",
            field: "name",
            type: "string",
            render: rowData => (<MainTableCell>{rowData.firstName} {rowData.lastName}</MainTableCell>),
        },
        {
            title: "Effective Date",
            field: "effectiveDate",
            type: "date",
            render: rowData => (<MainTableCell>{rowData.effectiveDate}</MainTableCell>),
        },
        {
            title: "Expiration Date",
            field: "expDate",
            type: "date",
            render: rowData => (
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Typography>{rowData.expDate}</Typography>
                    <IconButton size="small" onClick={e => handleOpenPopover(e, rowData)} aria-describedby={id}>
                        <MoreVert fontSize="small"/>
                    </IconButton>
                    <Popover
                        id={id}
                        open={popoverOpen}
                        anchorReference='anchorPosition'
                        anchorPosition={{ top: yTarget, left: xTarget }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        onClose={() => handleClosePopover()} >
                        <CardHeader
                            title={<Typography variant="subtitle2">Affidavit No 1234556</Typography>}
                            sx={{borderBottom: "solid lightgray 1px",
                            backgroundColor: theme.palette.background.default,
                            height: 5,
                            padding: "20px 25px 20px 10px",
                            whitespace: "nowrap"}} />
                        <CardContent sx={{padding: "5px 15px 10px 15px !important"}}>
                            <Typography variant="subtitle2">Company(s):</Typography>
                            <Typography sx={{ textTransform: "uppercase", paddingBottom: "5px"}} variant="subtitle1">company name</Typography>
                            <Typography variant="subtitle2">Coverage:</Typography>
                            <Typography sx={{ textTransform: "uppercase"}} variant="subtitle1">coverage type</Typography>
                        </CardContent>
                    </Popover>
                </Grid>
            ),
            width: "15em"
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
        filtering: showFilters,
        searchFieldStyle: { marginRight: "1em" }
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
