import MaterialTable, { MTableCell } from '@material-table/core';
import NestedTable from './NestedTable';
import {
    ThemeProvider,
    Grid,
    Typography,
    Button,
    Paper,
    Popover,
    TablePagination
} from '@mui/material';
import { TableToolbar, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme, theme } from '@aeros-ui/themes';
import { useState, useEffect, createRef } from 'react';
import { Stack } from '@mui/system';
import { TableIcons, CaratIcon } from '@aeros-ui/icons';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { columns } from './columns';
import isEmpty from '../../../functions/isEmpty';
import useProcNum from '../../../hooks/utility/useProcNum';
import getAnchorPosition from '../../../functions/getAnchorPosition';

import InfoMessage from './InfoMessage';

export default function Table({ loading, rows, showLicenseCol, setAffidavits }) {
    const tableRef = createRef();
    const { numberWithCommas } = useProcNum();
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

    const [partAEl, setPartAEl] = useState(null);
    const partAMessageOpen = Boolean(partAEl);
    const partAMessageId = partAMessageOpen ? 'partA-message-popover' : undefined;

    const [brokerNumEl, setBrokerNumMessage] = useState(null);
    const brokerNumMessageOpen = Boolean(brokerNumEl);

    const [data, setData] = useState([]);

    const handleOpenPartAMessage = (e, rowData, type = null) => {
        const rowCopy = { ...rowData };
        const dataCopy = [...rows];
        dataCopy[rowCopy.tableData.id] = rowCopy;

        const anchorPosition = getAnchorPosition(e);

        type ? setBrokerNumMessage(anchorPosition) : setPartAEl(anchorPosition);
        setData(dataCopy);
        setSelectedRow(rowCopy);
    };

    const handleClosePartAMessage = (type = null) => {
        const dataCopy = [...rows];
        if (selectedRow !== null) {
            const rowCopy = { ...selectedRow };
            // if (rowCopy.tableData.showDetailPanel) {
            //     rowCopy.tableData.showDetailPanel = false;
            // }
            dataCopy[rowCopy.tableData.id] = rowCopy;
        }

        type ? setBrokerNumMessage(null) : setPartAEl(null);
        setData(dataCopy);
        setSelectedRow(null);
    };

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

        setData(dataCopy);
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

        setData(dataCopy);
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
                target='_top'
                rel='noopener noreferrer'
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
        columnsButton: true,
        exportAllData: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: rows.length ? false : true,
        cellStyle: theme.typography,
        pageSizeOptions: [10, 25, 50, 100],
        detailPanelType: 'single',
        doubleHorizontalScroll: false,
        showDetailPanelIcon: true,
        pageSize: 10,
        padding: density,
        filtering: showFilters,
        showEmptyDataSourceMessage: !loading,
        headerStyle: {
            ...theme.components.headerStyle,
            backgroundColor: theme.palette.grid.main.header,
            whiteSpace: 'nowrap',
            padding: 10
        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow && selectedRow.tableData.id === rowData.tableData.id
                    ? theme.palette.grid.main.active
                    : theme.palette.grid.main.default
        }),
        exportMenu: [
            {
                label: 'Export as PDF',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Affidavit Inquiry')
            },
            {
                label: 'Export as CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Affidavit Inquiry')
            }
        ]
    };

    const handleDetailPanelIcon = (rowData) => {
        return (
            !isEmpty(rowData) &&
            !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION) &&
            !isEmpty(rowData.PARTA_TRANSACTION.CHILD_TRANSACTION[0])
        );
    };

    useEffect(() => {
        if (rows && rows.length > 0) {
            setData(rows);
            resetTableState();
        } else {
            setData([]);
        }
    }, [rows]);

    const [Columns, setColumns] = useState([
        ...columns(handlePopoverOpen, showLicenseCol, id, partAMessageId, handleOpenPartAMessage)
    ]);

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

    const resetTableState = () => {
        showFilters ? setFiltering(false) : null;
        tableRef && tableRef.current ? (tableRef.current.dataManager.searchText = '') : null;
        setColumns([
            ...columns(
                handlePopoverOpen,
                showLicenseCol,
                id,
                partAMessageId,
                handleOpenPartAMessage
            )
        ]);
    };

    return (
        <div
            style={{
                margin: '0.5em'
            }}
        >
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    tableRef={tableRef}
                    options={options}
                    columns={Columns}
                    data={data}
                    isLoading={loading}
                    icons={TableIcons}
                    detailPanel={[
                        (rowData) => ({
                            tooltip: handleDetailPanelIcon(rowData)
                                ? 'Related Transactions'
                                : false,
                            icon: () =>
                                handleDetailPanelIcon(rowData) ? (
                                    <CaratIcon color={'primary'} sx={{ pt: 1, pl: 1 }} />
                                ) : null,
                            disabled: handleDetailPanelIcon(rowData) ? false : true,
                            render: () => <NestedTable rowData={rowData} dense={density} />
                        })
                    ]}
                    components={{
                        Container: (props) => {
                            return <Paper elevation={0} {...props} />;
                        },
                        Cell: (props) => {
                            return (
                                <MTableCell
                                    style={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        paddingRight: '0px',
                                        paddingLeft: '0px'
                                        // border:'solid 1px blue'
                                    }}
                                    {...props}
                                ></MTableCell>
                            );
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
                <Popover
                    id={partAMessageId}
                    open={partAMessageOpen}
                    anchorReference='anchorPosition'
                    anchorPosition={partAEl}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    elevation={2}
                    onClose={() => handleClosePartAMessage()}
                >
                    {selectedRow && selectedRow.PARTA_TRANSACTION.PARTAMESSAGE.length > 0
                        ? selectedRow.PARTA_TRANSACTION.PARTAMESSAGE.map((message, i) => {
                              return (
                                  <InfoMessage
                                      key={`PARTA_TRANSACTION.PARTAMESSAGE_${i}`}
                                      title={message.MESSAGETYPE}
                                      data={message.MESSAGE}
                                  />
                              );
                          })
                        : null}
                </Popover>
                <Popover
                    id={'BrokerMessagePopover'}
                    open={brokerNumMessageOpen}
                    anchorReference='anchorPosition'
                    anchorPosition={brokerNumEl}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    elevation={2}
                    onClose={() => handleClosePartAMessage('BATCHNO')}
                >
                    {selectedRow &&
                    selectedRow.PARTA_TRANSACTION.BATCHNO !== null &&
                    selectedRow.PARTA_TRANSACTION.BATCHID !==
                        parseInt(selectedRow.PARTA_TRANSACTION.BATCHNO) ? (
                        <InfoMessage
                            title={'ELANY Batch No.'}
                            data={selectedRow.PARTA_TRANSACTION.BATCHNO}
                        />
                    ) : null}
                </Popover>
            </ThemeProvider>
        </div>
    );
}
