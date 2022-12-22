import MaterialTable, { MTableCell } from '@material-table/core';
import NestedTable from './NestedTable';
import {
    TablePagination,
    ThemeProvider,
    Grid,
    Typography,
    Button,
    Paper,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    createTheme
} from '@mui/material';
import { TableToolbar, DetailCard } from '@aeros-ui/tables';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { tableTheme, theme } from '@aeros-ui/themes';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import { TableIcons, CaratIcon } from '@aeros-ui/icons';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { columns } from './columns';
import isEmpty from '../../../functions/isEmpty';
import useProcNum from '../../../hooks/utility/useProcNum';
import getAnchorPosition from '../../../functions/getAnchorPosition';

const messageTheme = createTheme({
    palette: {
        primary: {
            main: '#0097FB',
            light: '#B8E3FF',
            dark: '#004B6E'
        }
    },
    typography: {
        h6: {
            fontSize: '15px'
        }
    },
    components: {
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '0.5em',
                    borderTopColor: 'transparent'
                },
                avatar: {
                    marginRight: '0.5em'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '0.25em',
                    backgroundColor: 'rgba(0, 226, 208, 0.08)',
                    '&:last-child': {
                        paddingBottom: '0.25em'
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    paddingBottom: '0.25em'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation: 4
            }
        }
    }
});

const InfoMessage = (props) => {
    return (
        <ThemeProvider theme={messageTheme}>
            <Card sx={{ borderRadius: '0px' }}>
                <CardHeader
                    title={props.title}
                    avatar={<InfoIcon color='info' fontSize='small' />}
                    titleTypographyProps={{ variant: 'h6', color: 'primary.dark' }}
                />
                <CardContent>
                    <List sx={{ width: '100%' }}>
                        {Array.isArray(props.data) ? (
                            props.data.map((d, i) => {
                                return (
                                    <ListItem key={`info-${i}`}>
                                        <ListItemText
                                            primary={d}
                                            primaryTypographyProps={{ color: 'primary.dark' }}
                                        />
                                    </ListItem>
                                );
                            })
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary={props.data}
                                    primaryTypographyProps={{ color: 'primary.dark' }}
                                />
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default function Table({ loading, rows, showLicenseCol, setAffidavits }) {
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

    const handleOpenPartAMessage = (e, rowData, type = null) => {
        const rowCopy = { ...rowData };
        const dataCopy = [...rows];
        dataCopy[rowCopy.tableData.id] = rowCopy;

        const anchorPosition = getAnchorPosition(e);

        type ? setBrokerNumMessage(anchorPosition) : setPartAEl(anchorPosition);
        setAffidavits(dataCopy);
        setSelectedRow(rowCopy);
    };

    const handleClosePartAMessage = (type = null) => {
        const dataCopy = [...rows];
        if (selectedRow !== null) {
            const rowCopy = { ...selectedRow };
            if (rowCopy.tableData.showDetailPanel) {
                rowCopy.tableData.showDetailPanel = false;
            }
            dataCopy[rowCopy.tableData.id] = rowCopy;
        }

        type ? setBrokerNumMessage(null) : setPartAEl(null);
        setAffidavits(dataCopy);
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
                target='_top'
                rel='noopener noreferrer'
                startIcon={
                    currentCompanyDetails.batchView === 'VIEW' ? (
                        <FontDownloadIcon />
                    ) : (
                        <ModeEditIcon />
                    )
                }>
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
        // tableLayout:'fixed',
        doubleHorizontalScroll: false,
        showDetailPanelIcon: true,
        pageSize: 10,
        padding: density,
        filtering: showFilters,
        showEmptyDataSourceMessage: !loading,
        headerStyle: {
            ...theme.components.headerStyle,
            backgroundColor: theme.palette.grid.main.header
            // border: 'solid red 1px',
            // display: 'flex',
            // justifyContent:'center'
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

    return (
        <div
            style={{
                margin: '1em'
            }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable
                    title={''}
                    options={options}
                    columns={columns(
                        handlePopoverOpen,
                        showLicenseCol,
                        id,
                        numberWithCommas,
                        InfoMessage,
                        partAMessageId,
                        partAMessageOpen,
                        partAEl,
                        selectedRow,
                        handleOpenPartAMessage,
                        handleClosePartAMessage,
                        brokerNumEl,
                        brokerNumMessageOpen
                    )}
                    data={rows}
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
