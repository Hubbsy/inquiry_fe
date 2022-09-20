import MaterialTable, { MTableCell } from '@material-table/core';
import NestedTable from './NestedTable';
import { TablePagination, ThemeProvider, Grid, Typography, Button } from '@mui/material';
import { TableToolbar, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme, theme } from '@aeros-ui/themes';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { TableIcons, CaratIcon } from '@aeros-ui/icons';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Columns from './columns';
import isEmpty from '../../../functions/isEmpty';

const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return {
        innerWidth,
        innerHeight
    };
};

export default function Table({ loading, rows, showLicenseCol, setAffidavits }) {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rowCopy, setRowCopy] = useState(null);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [currentCompanyDetails, setCurrentCompanyDetails] = useState({
        affidavitNo: 'No current Affidavit No.',
        address: 'No current Company Info.'
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'menu-popover' : undefined;

    const handleDensityClick = () => {
        density === 'normal' ? setDensity('dense') : setDensity('normal');
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

    const handlePopoverOpen = (e, rowData) => {
        console.log("rowPopOpen", rowData)
        let rowClicked = { ...rowData };
        setRowCopy(rowData);
        const dataCopy = [...rows];
        dataCopy[rowClicked.tableData.id] = rowClicked;

        rowClicked.PARTA_TRANSACTION.companyDetails.address = compileFullAddress(
            rowData.PARTA_TRANSACTION.companyDetails
        );
        setCurrentCompanyDetails(rowClicked.PARTA_TRANSACTION.companyDetails);

        const anchorPosition = anchorPositionByAnchorEl(e);
        setAnchorEl(anchorPosition);
        setSelectedRow(rowClicked);

        setAffidavits(dataCopy);
    };

    const handlePopoverClose = () => {
        console.log("rowPopClose", rowCopy);
        let rowClicked = { ...rowCopy };
        const dataCopy = [...rows];
        dataCopy[rowClicked.tableData.id] = rowClicked;

        setAnchorEl(null);
        setSelectedRow(null);

        setAffidavits(dataCopy);
    };

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
                <Typography sx={{ mb: 0 }} variant='subtitle2' gutterBottom>
                    Risk Address:
                </Typography>
            </Grid>
            <Grid item container sx={{ pb: 1 }}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentCompanyDetails.address.line1}
                    </Typography>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentCompanyDetails.address.line2}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{ mb: 0 }} variant='subtitle2' gutterBottom>
                    Company(s):
                </Typography>
            </Grid>
            <Grid item container sx={{ pb: 1 }}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentCompanyDetails.company}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{ mb: 0 }} variant='subtitle2' gutterBottom>
                    Coverage:
                </Typography>
            </Grid>
            <Grid item container sx={{ pb: 1 }}>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentCompanyDetails.coverage}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container>
                <Typography sx={{ mb: 0 }} variant='subtitle2' gutterBottom>
                    Risk:
                </Typography>
            </Grid>
            <Grid item container>
                <Stack>
                    <Typography variant='body2' sx={{ textTransform: 'none' }}>
                        {currentCompanyDetails.risk}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );

    const actions = (
        <Grid item container justifyContent='flex-end'>
            <Button
                href={currentCompanyDetails.batchLink}
                size='small'
                variant='outlined'
                startIcon={
                    currentCompanyDetails.batchView === 'VIEW' ? <FontDownloadIcon /> : <ModeEditIcon />
                }
            >
                {currentCompanyDetails.batchView} Affidavit
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
        searchFieldStyle: { marginRight: '1em', width: '100%' },
        emptyRowsWhenPaging: rows.length ? false : true,
        detailPanelColumnAlignment: 'left',
        tableLayout: windowSize.innerWidth < 1225 ? '' : 'fixed',
        cellStyle: theme.typography
    };

    const detailPanel = [
        (rowData) => ({
            tooltip: 'Show Child Transactions',
            icon: () =>
            !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION) &&
            !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION[0]) ? (
                <CaratIcon color={'primary'} sx={{ pt: 1, pl: 1 }} />
            ) : null,
            render: ({ rowData }) => <NestedTable rowData={rowData} />
        })
    ];

    return (
        <div
            style={{
                margin: '1em'
            }}
        >
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    options={options}
                    columns={columns}
                    data={[...rows]}
                    isLoading={loading}
                    icons={TableIcons}
                    // onRowClick={(e, selectedRow, togglePanel) => {
                    //     togglePanel()
                    // }}
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
                                        whiteSpace: 'nowrap'
                                    }}
                                    {...props}
                                ></MTableCell>
                            );
                        }
                    }}
                />
                <DetailCard
                    id={id}
                    popoverId='detailPopover'
                    open={popoverOpen}
                    anchorReference='anchorPosition'
                    anchorPosition={anchorEl}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    handleClose={handlePopoverClose}
                    width={300}
                    title={`Affidavit No. ${currentCompanyDetails.affidavitNo}`}
                    content={content}
                    actions={actions}
                />
            </ThemeProvider>
        </div>
    );
}
