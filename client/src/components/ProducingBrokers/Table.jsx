import MaterialTable from '@material-table/core';
import { 
    TablePagination,
    useTheme,
    ThemeProvider, 
    Grid,
    Typography,
    Popover,
    CardHeader,
    CardContent,
    Paper
} from '@mui/material';
import { TableToolbar, MainTableCell, DetailCard } from '@aeros-ui/tables';
import { tableTheme } from '@aeros-ui/themes';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';

export default function Table({ rows }) {
    const theme = useTheme();
    const [density, setDensity] = useState('normal');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentRowData, setCurrentRowData] = useState({
        licenseNo: "no current license No.",
        address: "no current address"
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
        console.log(selectedRow);
    }

    const handlePopoverOpen = useCallback((event, rowData) => {
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
                <Typography variant='body2' sx={{ textTransform: 'none' }}>
                    {currentRowData.address}
                </Typography>
            </Grid>
        </Grid>
    );

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
            render: rowData => (<MainTableCell>{format(new Date(rowData.effectiveDate), "MM/dd/yyyy")}</MainTableCell>),
        },
        {
            title: "Expiration Date",
            field: "expDate",
            render: rowData => (
                <>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontSize: "14px" }}>
                            {format(new Date(rowData.expDate), "MM/dd/yyyy")}</Typography>
                        <StyledMoreVertIcon onClick={e => handlePopoverOpen(e, rowData)} fontSize="small"/>
                    </Grid>
                    <Grid item container sx={{boxShadow: "none !important"}}>
                        <DetailCard
                            popoverId="detailPopover"
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
                    </Grid>
                </>
            ),
            width: "15em"
        },
    ];

    const StyledMoreVertIcon = styled(MoreVert)(({theme}) => ({
        height: 32,
        width: 18,
        display: "flex",
        color: "gray",

        "&:active": {
            height: 32,
            width: 18,
            borderRadius: "50%",
            backgroundColor: theme.palette.grid.main.active,
            padding: 0,
            color: "gray"
        },
        "&:focus": {
            height: 32,
            width: 18,
            borderRadius: "50%",
            backgroundColor: theme.palette.grid.main.active,
            padding: 0,
            color: "gray"
        },
    }))

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
                        ),
                        Container: props => {
                            return (
                                <Paper elevation={4} {...props}/>
                            )

                        }
                    }}
                />
            </ThemeProvider>
        </div>
    );
}
