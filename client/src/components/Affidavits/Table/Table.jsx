import MaterialTable, { MTableCell } from '@material-table/core';
import NestedTable from './NestedTable';
import { TablePagination, useTheme, ThemeProvider, Grid, Typography, TableCell, Box, Button } from '@mui/material';
import { TableToolbar, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme, theme } from '@aeros-ui/themes';
import { useState, useCallback, useEffect } from 'react';
import { Stack } from '@mui/system';
import { TableIcons, CaratIcon } from '@aeros-ui/icons';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Columns from './columns';

const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    console.log(innerWidth)
    return {
        innerWidth, 
        innerHeight
    };
}

export default function Table({ loading, rows, adjustPadding, showLicenseCol }) {
    // const theme = useTheme();
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [currentRowData, setCurrentRowData] = useState({
        affidavitNo: 'No current Affidavit No.',
        address: 'No current Company Info.'
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
    };

    const handleRowClick = (row) => {
        closeRow();
        
        const rowCopy = {...row};
        setSelectedRow(rowCopy);
    };

    const closeRow = () => {
        if(selectedRow !== null){
            const rowCopy = {...selectedRow};
            if(rowCopy.tableData.showDetailPanel){
                rowCopy.tableData.showDetailPanel = false;
            }
        }
        setSelectedRow(null);
    };

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    const compileFullAddress = (options) => {
        return {
            line1: `${options.riskAddress}`,
            line2: `${options.city}, ${options.state}, ${options.zip}`
        };
    };

    const handlePopoverOpen = useCallback((event, rowData) => {
        setSelectedRow(rowData);
        rowData.companyDetails.address = compileFullAddress(rowData.companyDetails);
        setCurrentRowData(rowData.companyDetails);
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
                <Typography sx={{mb: 0}} variant='subtitle2' gutterBottom>
                    Risk Address:
                </Typography>
            </Grid>
            <Grid item container sx={{pb: 1}}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.address.line1}
                    </Typography>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.address.line2}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{mb: 0}} variant='subtitle2' gutterBottom>
                    Company(s):
                </Typography>
            </Grid>
            <Grid item container sx={{pb: 1}}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.company}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{mb: 0}} variant='subtitle2' gutterBottom>
                    Coverage:
                </Typography>
            </Grid>
            <Grid item container sx={{pb: 1}}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.coverage}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{mb: 0}} variant='subtitle2' gutterBottom>
                    Risk:
                </Typography>
            </Grid>
            <Grid item container>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentRowData.risk}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );

    const actions = (
        <Grid item container justifyContent='flex-end'>
            <Button href={currentRowData.batchLink} size='small' variant='outlined' startIcon={currentRowData.batchView === "VIEW" ? <FontDownloadIcon/> : <ModeEditIcon/>} >
                {currentRowData.batchView} Affidavit
            </Button>
        </Grid>
    );

    const columns = Columns(handlePopoverOpen, showLicenseCol, popoverOpen);

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
            // overflow: 'hidden'
            whiteSpace: 'nowrap'

        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow && selectedRow.tableData.id === rowData.tableData.id
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
        searchFieldStyle: { marginRight: '1em', width: "100%" },
        emptyRowsWhenPaging: rows.length ? false : true,
        detailPanelColumnAlignment: "left",
        tableLayout: windowSize.innerWidth < 1225 ? "" : "fixed",
        cellStyle: theme.typography,
    };

    const detailPanel = [
        rowData => ({
            tooltip: "Show Child Transactions",
            icon: () => rowData.expandable ? <CaratIcon color={"primary"} sx={{pt: 1, pl: 1}} /> : null,
            render: ({rowData}) => (
                    <NestedTable 
                        rowData={rowData}
                    /> 
                )
        })
    ];

    return (
        <div
            style={{
                marginTop: '1em',
                marginRight: `${adjustPadding ? '0.10em' : '1em'}`,
                marginLeft: '1em',
                marginBottom: '1em'
            }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    options={options}
                    columns={columns}
                    data={rows}
                    isLoading={loading}
                    icons={TableIcons}
                    onRowClick={(e, selectedRow, togglePanel) => {handleRowClick(selectedRow); togglePanel()}}
                    detailPanel={detailPanel}
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
                        ),
                        Cell: (props) => {
                            return (
                                <MTableCell
                                    style={{
                                        whiteSpace: 'nowrap',
                                        // textOverflow: 'ellipsis',
                                        // overflow: 'hidden'
                                    }}
                                    {...props}></MTableCell>
                            );
                        },
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
                    title={`Affidavit No. ${currentRowData.affidavitNo}`}
                    content={content}
                    actions={actions}
                />
            </ThemeProvider>
        </div>
    );
}
