import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { format, isValid } from 'date-fns';
import { theme } from '@aeros-ui/themes';
import StateChips from '../../template/StateChips';

export const columns = (handlePopoverOpen, showLicenseCol, id) => [
    {
        title: 'License No.',
        field: 'PARTA_TRANSACTION.LICENSENO',
        type: 'string',
        hidden: !showLicenseCol,
        width: '8em',
        cellStyle: { minWidth: '8em', maxWidth: '10em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.LICENSENO}</MainTableCell>,
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
        width: '8em',
        cellStyle: { minWidth: '8em', maxWidth: '11em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.AFFIDAVITNO}</MainTableCell>,
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
        width: '8em',
        cellStyle: { minWidth: '8em', maxWidth: '11em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.POLICYNO}</MainTableCell>,
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
        width: '10em',
        cellStyle: { minWidth: '10em', maxWidth: '20em' },
        render: (rowData) => (
            <MainTableCell>{rowData.PARTA_TRANSACTION.RISKINSUREDNAME}</MainTableCell>
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
        width: '4em',
        cellStyle: { minWidth: '4em', maxWidth: '4em' },
        render: (rowData) => (
            <MainTableCell>{rowData.PARTA_TRANSACTION.TRANSACTIONTYPE}</MainTableCell>
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
        width: '6em',
        cellStyle: { minWidth: '6em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.AMOUNT}</MainTableCell>,
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        currencySettings: { style: 'currency', currency: 'USD', minimumFractionDigits: 0 },
        customSort: (a, b) =>
            parseFloat(a.PARTA_TRANSACTION.AMOUNT.replace(',', '.')) -
            parseFloat(b.PARTA_TRANSACTION.AMOUNT.replace(',', '.'))
    },
    {
        title: 'Inception',
        field: 'PARTA_TRANSACTION.EFFECTIVEDATE',
        type: 'string',
        width: '6em',
        cellStyle: { minWidth: '6em' },
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        render: (rowData) => (
            <MainTableCell>
                {isValid(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE))
                    ? format(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE), 'MM/dd/yyyy')
                    : ''}
            </MainTableCell>
        ),
        customFilterAndSearch: (term, rowData) => {
            let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE))
                ? format(new Date(rowData.PARTA_TRANSACTION.EFFECTIVEDATE), 'MM/dd/yyyy')
                : '';
            return cellDateValue.search(term) !== -1 ? true : false;
        }
    },
    {
        title: 'Expiration',
        field: 'PARTA_TRANSACTION.EXPIRATIONDATE',
        type: 'string',
        width: '6em',
        cellStyle: { minWidth: '6em' },
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        render: (rowData) => (
            <MainTableCell>
                {isValid(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE))
                    ? format(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE), 'MM/dd/yyyy')
                    : ''}
            </MainTableCell>
        ),
        customFilterAndSearch: (term, rowData) => {
            let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE))
                ? format(new Date(rowData.PARTA_TRANSACTION.EXPIRATIONDATE), 'MM/dd/yyyy')
                : '';
            return cellDateValue.search(term) !== -1 ? true : false;
        }
    },
    {
        title: 'Batch',
        field: 'PARTA_TRANSACTION.BATCHNO',
        type: 'string',
        width: '5em',
        cellStyle: { minWidth: '5em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.BATCHNO}</MainTableCell>,
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
        width: '6em',
        cellStyle: { minWidth: '6em' },
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.RECEIVEDATE}</MainTableCell>,
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        customFilterAndSearch: (term, rowData) => {
            let cellDateValue = isValid(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE))
                ? format(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE), 'MM/dd/yyyy')
                : '';
            return cellDateValue.search(term) !== -1 ? true : false;
        }
    },
    {
        title: 'Proc State',
        field: 'PARTA_TRANSACTION.PROCESSEDSTATE',
        type: 'string',
        width: '8em',
        cellStyle: { minWidth: '8em' },
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        render: (rowData) => {
            return (
                <Grid item container justifyContent='space-between' alignItems='center'>
                    <Grid item xs={10}>
                        {rowData.PARTA_TRANSACTION.PROCESSEDSTATE.trim() === '' ? (
                            <MainTableCell>
                                {rowData.PARTA_TRANSACTION.PROCESSEDSTATE}
                            </MainTableCell>
                        ) : (
                            <StateChips state={rowData.PARTA_TRANSACTION.PROCESSEDSTATE} />
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            size='small'
                            onClick={(e) => handlePopoverOpen(e, rowData)}
                            aria-describedby={id}>
                            <MoreVert fontSize='small' />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        },
        hiddenByColumnsButton: true
    }
];
