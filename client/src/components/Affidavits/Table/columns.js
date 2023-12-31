import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { Grid, IconButton, Popover, Tooltip } from '@mui/material';
import { format, isValid } from 'date-fns';
import { theme } from '@aeros-ui/themes';
import StateChips from '../../template/StateChips';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { floatToDollarsConverter } from '../../../functions/currencyHelpers';
import { Link } from 'react-router-dom';
import { batch } from 'react-redux';

const ellipsisText = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
};

export const columns = (
    handlePopoverOpen,
    showLicenseCol,
    id,
    partAMessageId,
    handleOpenPartAMessage,
    navigate
) => {
    const navToBatch = (batchId) => {
        let path = `${window.location.origin}/parta/batch-listing/${batchId}`;
        navigate(path);
    };

    return [
        {
            title: 'License No.',
            field: 'PARTA_TRANSACTION.LICENSENO',
            type: 'string',
            maxWidth: '100px',
            hidden: !showLicenseCol,
            hiddenByColumnsButton: !showLicenseCol,
            render: (rowData) => (
                <MainTableCell>{rowData.PARTA_TRANSACTION.LICENSENO}</MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Affidavit No.',
            field: 'PARTA_TRANSACTION.AFFIDAVITNO',
            type: 'string',
            maxWidth: '100px',
            render: (rowData) => (
                <Grid
                    item
                    container
                    justifyContent='start'
                    alignItems='center'
                    sx={{ flexWrap: 'nowrap' }}>
                    <MainTableCell style={{ ...ellipsisText }}>
                        {rowData.PARTA_TRANSACTION.AFFIDAVITNO}
                    </MainTableCell>
                    {rowData.PARTA_TRANSACTION.PARTAMESSAGE.length > 0 ? (
                        <IconButton
                            size='small'
                            aria-describedby={partAMessageId}
                            onClick={(e) => {
                                handleOpenPartAMessage(e, rowData);
                            }}>
                            <InfoOutlinedIcon fontSize='small' color='info' />
                        </IconButton>
                    ) : null}
                </Grid>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Policy No.',
            field: 'PARTA_TRANSACTION.POLICYNO',
            type: 'string',
            render: (rowData) => (
                <MainTableCell style={{ ...ellipsisText, paddingRight: '1em' }}>
                    {rowData.PARTA_TRANSACTION.POLICYNO}
                </MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Insured Name',
            field: 'PARTA_TRANSACTION.RISKINSUREDNAME',
            type: 'string',
            cellStyle: { maxWidth: '325px' },
            render: (rowData) => (
                <MainTableCell style={{ ...ellipsisText }}>
                    {rowData.PARTA_TRANSACTION.RISKINSUREDNAME}
                </MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Type',
            field: 'PARTA_TRANSACTION.TRANSACTIONTYPE',
            type: 'string',
            maxWidth: '50px',
            render: (rowData) => (
                <MainTableCell
                    style={{
                        ...ellipsisText,
                        textAlign: 'center',
                        width: '90%'
                    }}>
                    {rowData.PARTA_TRANSACTION.TRANSACTIONTYPE}
                </MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Premium',
            field: 'PARTA_TRANSACTION.AMOUNT',
            type: 'currency',
            maxWidth: '75px',
            render: (rowData) => (
                <MainTableCell style={{ ...ellipsisText, paddingRight: '1em' }}>
                    {floatToDollarsConverter.format(rowData.PARTA_TRANSACTION.AMOUNT)}
                </MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            customSort: (a, b) =>
                parseFloat(a.PARTA_TRANSACTION.AMOUNT.replace(',', '.')) -
                parseFloat(b.PARTA_TRANSACTION.AMOUNT.replace(',', '.'))
        },
        {
            title: 'Inception',
            field: 'PARTA_TRANSACTION.EFFECTIVEDATE',
            type: 'string',
            maxWidth: '100px',
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            render: (rowData) => {
                return (
                    <MainTableCell style={{ ...ellipsisText }}>
                        {isValid(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE))
                            ? format(
                                  new Date(
                                      rowData.PARTA_TRANSACTION.EFFECTIVEDATE.replace(/-/g, '/')
                                  ),
                                  'MM/dd/yyyy'
                              )
                            : ''}
                    </MainTableCell>
                );
            },
            customFilterAndSearch: (term, rowData) => {
                let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE))
                    ? format(
                          new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE.replace(/-/g, '/')),
                          'MM/dd/yyyy'
                      )
                    : '';
                return cellDateValue.search(term) !== -1 ? true : false;
            }
        },
        {
            title: 'Expiration',
            field: 'PARTA_TRANSACTION.EXPIRATIONDATE',
            type: 'string',
            maxWidth: '100px',
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            render: (rowData) => (
                <MainTableCell style={{ ...ellipsisText }}>
                    {isValid(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE))
                        ? format(
                              new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE.replace(/-/g, '/')),
                              'MM/dd/yyyy'
                          )
                        : ''}
                </MainTableCell>
            ),
            customFilterAndSearch: (term, rowData) => {
                let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE))
                    ? format(
                          new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE.replace(/-/g, '/')),
                          'MM/dd/yyyy'
                      )
                    : '';
                return cellDateValue.search(term) !== -1 ? true : false;
            }
        },
        {
            title: 'Batch',
            field: 'PARTA_TRANSACTION.BATCHID',
            type: 'string',
            render: (rowData) => (
                <Grid
                    item
                    container
                    justifyContent='start'
                    alignItems='center'
                    sx={{ flexWrap: 'nowrap' }}>
                    <MainTableCell style={{ ...ellipsisText }}>
                        {/* <a href={rowData.PARTA_TRANSACTION.TRANSLISTLINK}>
                            {rowData.PARTA_TRANSACTION.BATCHID}
                        </a> */}
                        <Link
                            to={''}
                            onClick={() => {
                                window.top.location.href = rowData.PARTA_TRANSACTION.TRANSLISTLINK;
                            }}
                            style={{
                                color: 'rgb(0, 0, 238)'
                            }}>
                            {rowData.PARTA_TRANSACTION.BATCHID}
                        </Link>
                    </MainTableCell>
                    {rowData.PARTA_TRANSACTION.BATCHNO !== null &&
                    rowData.PARTA_TRANSACTION.BATCHID !==
                        parseInt(rowData.PARTA_TRANSACTION.BATCHNO) ? (
                        <IconButton
                            size='small'
                            aria-describedby={partAMessageId}
                            onClick={(e) => {
                                handleOpenPartAMessage(e, rowData, 'BATCHNO');
                            }}>
                            <InfoOutlinedIcon fontSize='small' color='info' />
                        </IconButton>
                    ) : null}
                </Grid>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Submitted',
            field: 'PARTA_TRANSACTION.RECEIVEDATE',
            type: 'string',
            maxWidth: '100px',
            render: (rowData) => (
                <MainTableCell style={{ ...ellipsisText }}>
                    {isValid(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE))
                        ? format(
                              new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE.replace(/-/g, '/')),
                              'MM/dd/yyyy'
                          )
                        : ''}
                </MainTableCell>
            ),
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            customFilterAndSearch: (term, rowData) => {
                let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE))
                    ? format(
                          new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE.replace(/-/g, '/')),
                          'MM/dd/yyyy'
                      )
                    : '';
                return cellDateValue.search(term) !== -1 ? true : false;
            }
        },
        {
            title: 'State',
            field: 'PARTA_TRANSACTION.PROCESSEDSTATE',
            type: 'string',
            // cellStyle: { maxWidth: '9em' },
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            customFilterAndSearch: (term, rowData) => {
                const stateList = [
                    { letter: 'P', state: 'processed' },
                    { letter: 'U', state: 'not processed' },
                    { letter: 'S', state: 'suspense' }
                ];
                for (const state of stateList) {
                    if (state.letter === rowData.PARTA_TRANSACTION.PROCESSEDSTATE) {
                        return state
                            ? state.state.startsWith(term.toLowerCase())
                            : rowData.PARTA_TRANSACTION.PROCESSEDSTATE.startsWith(
                                  term.toLowerCase()
                              );
                    }
                }
            },
            render: (rowData) => {
                return (
                    <Grid
                        item
                        container
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ flexWrap: 'nowrap' }}>
                        {rowData.PARTA_TRANSACTION.PROCESSEDSTATE.trim() === '' ? (
                            <MainTableCell>
                                {rowData.PARTA_TRANSACTION.PROCESSEDSTATE}
                            </MainTableCell>
                        ) : (
                            <StateChips state={rowData.PARTA_TRANSACTION.PROCESSEDSTATE} />
                        )}
                        <IconButton
                            size='small'
                            onClick={(e) => handlePopoverOpen(e, rowData)}
                            aria-describedby={id}>
                            <MoreVert fontSize='small' />
                        </IconButton>
                    </Grid>
                );
            },
            hiddenByColumnsButton: true
        }
    ];
};
