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
import {columns} from './columns';
import isEmpty from '../../../functions/isEmpty';

export default function Table({ loading, rows, showLicenseCol, setAffidavits }) {
    const [density, setDensity] = useState('dense');
    const [showFilters, setFiltering] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

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

    const compileFullAddress = (options) => {
        return {
            line1: `${options.riskAddress}`,
            line2: `${options.city}, ${options.state}, ${options.zip}`
        };
    };

    const handlePopoverOpen = (e, rowData) => {
        const rowCopy = { ...rowData };
        const dataCopy = [...rows];
        dataCopy[rowCopy.tableData.id] = rowCopy;

        rowData.PARTA_TRANSACTION.companyDetails.address = compileFullAddress(
            rowData.PARTA_TRANSACTION.companyDetails
        );
        setCurrentCompanyDetails(rowData.PARTA_TRANSACTION.companyDetails);

        const anchorPosition = anchorPositionByAnchorEl(e);
        setAnchorEl(anchorPosition);

        setAffidavits(dataCopy);
        setSelectedRow(rowCopy);
    };

    const handlePopoverClose = () => {
        const dataCopy = [...rows];
        if (selectedRow !== null) {
            const rowCopy = { ...selectedRow };
            if (rowCopy.tableData.showDetailPanel) {
                rowCopy.tableData.showDetailPanel = false;
            }
            dataCopy[rowCopy.tableData.id] = rowCopy;
        }

        setAffidavits(dataCopy);
        setAnchorEl(null);
        setSelectedRow(null);
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
                    currentCompanyDetails.batchView === 'VIEW' ? (
                        <FontDownloadIcon />
                    ) : (
                        <ModeEditIcon />
                    )
                }
            >
                {currentCompanyDetails.batchView} Affidavit
            </Button>
        </Grid>
    );


    const options = {
        showDetailPanelIcon: true,
        pageSize: 10,
        padding: density,
        showEmptyDataSourceMessage: !loading,
        headerStyle: {
            backgroundColor: theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: 'capitalize',
            paddingTop: '0.5em',
            paddingBottom: '0.5em',
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
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Affidavit Data')
            }
        ],
        columnsButton: true,
        filtering: showFilters,
        searchFieldStyle: { marginRight: '1em', width: '100%' },
        emptyRowsWhenPaging: rows.length ? false : true,
        detailPanelType: 'single',
        // tableLayout:'fixed'
    };

    const handleDetailPanelIcon = (rowData)=>{return  !isEmpty(rowData) &&
        !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION) &&
        !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION[0])}

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
                    columns={columns(handlePopoverOpen, showLicenseCol,id)}
                    data={rows}
                    isLoading={loading}
                    icons={TableIcons}
                    detailPanel={
                        [
                           
                        (rowData) => ({
                            tooltip: handleDetailPanelIcon(rowData) ? 'Related Transactions': false,
                            icon: () => handleDetailPanelIcon(rowData) ? <CaratIcon color={'primary'} sx={{ pt: 1, pl: 1 }}  />:null,
                            disabled:handleDetailPanelIcon(rowData) ? false : true,
                            render:()=>( <><NestedTable rowData={rowData} dense={density} /> {console.log(rowData)}</>)
                        })
                    ]
                }
                    components={{
                    
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
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
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
