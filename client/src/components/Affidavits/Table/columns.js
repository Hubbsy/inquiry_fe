import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { format, isValid } from 'date-fns';

const StyledMoreVertIcon = styled(MoreVert)(({ theme }) => ({
    height: 32,
    width: 18,
    display: 'flex',
    color: 'gray',
    '&:hover': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    },
    '&:active': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    },
    '&:focus': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    }
}));

export default function Columns(handlePopoverOpen, showLicenseCol, popoverOpen) {
    const cols = [
        {
            title: 'License No.',
            field: 'PARTA_TRANSACTION.LICENSENO',
            type: 'string',
            width: '10%',
            hidden: !showLicenseCol,
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
            headerStyle: {
                whiteSpace: 'nowrap'
            },
            type: 'string',
            width: '10%',
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
            width: '14%',
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
            width: '19%',
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
            width: '4%',
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
            width: '8%',
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
            width: '8%',
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
            width: '8%',
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
            width: '8%',
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
        },
        {
            title: 'Submitted',
            field: 'PARTA_TRANSACTION.RECEIVEDATE',
            width: '8%',
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
            width: '5%',
            align: 'center',
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
        },
        {
            title: '',
            field: 'detailsPopoverIcon',
            render: (rowData) => (
                <StyledMoreVertIcon
                    onClick={(e) => handlePopoverOpen(e, rowData)}
                    aria-describedby={popoverOpen ? 'menu-popover' : undefined}
                />
            ),
            hiddenByColumnsButton: true,
            filtering: false
        }
    ];

    return cols;
}
