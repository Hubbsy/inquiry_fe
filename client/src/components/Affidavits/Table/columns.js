import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { format, isValid } from 'date-fns';

export const columns = (handlePopoverOpen, showLicenseCol, id) => [
    {
        title: 'License No.',
        field: 'PARTA_TRANSACTION.LICENSENO',
        type: 'string',
        hidden: !showLicenseCol,
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
        render: (rowData) => (
            <MainTableCell noWrap>{rowData.PARTA_TRANSACTION.RISKINSUREDNAME}</MainTableCell>
        ),
        width: '250px',
        cellStyle: { maxWidth: '250px' },
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
        render: (rowData) => (
            <MainTableCell>{rowData.PARTA_TRANSACTION.TRANSACTIONTYPE}</MainTableCell>
        ),
        width: '50px',
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
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.AMOUNT}</MainTableCell>,
        width: '125px',
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
        width: '100px',
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
        width: '100px',
        type: 'string',
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
        render: (rowData) => <MainTableCell>{rowData.PARTA_TRANSACTION.BATCHID}</MainTableCell>,
        width: '100px',
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
        width: '7em',
        type: 'string',
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        },
        render: (rowData) => (
            <MainTableCell>
                {isValid(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE))
                    ? format(new Date(rowData.PARTA_TRANSACTION.RECEIVEDATE), 'MM/dd/yyyy')
                    : ''}
            </MainTableCell>
        ),
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
                    <MainTableCell>{rowData.PARTA_TRANSACTION.PROCESSEDSTATE}</MainTableCell>
                    <IconButton
                        size='small'
                        onClick={(e) => handlePopoverOpen(e, rowData)}
                        aria-describedby={id}>
                        <MoreVert fontSize='small' />
                    </IconButton>
                </Grid>
            );
        },
        width: '50px',
        hiddenByColumnsButton: true
    }
];
