import { MainTableCell } from '@aeros-ui/tables';
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

export default function Columns(handlePopoverOpen) {
    const cols = [
        {
            title: 'Affidavit No.',
            field: 'AFFIDAVITNO',
            type: 'string',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.AFFIDAVITNO}
                </MainTableCell>
            )
        },
        {
            title: 'Policy No.',
            field: 'POLICYNO',
            type: 'string',
            width: '25em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em'} }}>
                    {rowData.POLICYNO}
                </MainTableCell>
            )
        },
        {
            title: 'Insured Name',
            field: 'RISKINSUREDNAME',
            type: 'string',
            width: '40em',
            render: (rowData) => (
                <MainTableCell sx={{ whiteSpace: 'nowrap' }}>{rowData.RISKINSUREDNAME}</MainTableCell>
            )
        },
        {
            title: 'Type',
            field: 'TRANSACTIONTYPE',
            type: 'string',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.TRANSACTIONTYPE}
                </MainTableCell>
            )
        },
        {
            title: 'Premium',
            field: 'AMOUNT',
            type: 'string',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.AMOUNT}
                </MainTableCell>
            )
        },
        {
            title: 'Inception',
            field: 'EFFECTIVEDATE',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.EFFECTIVEDATE), 'MM/dd/yyyy')}
                </MainTableCell>
            )
        },
        {
            title: 'Expiration',
            field: 'EXPIRATIONDATE',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.EXPIRATIONDATE), 'MM/dd/yyyy')}
                </MainTableCell>
            )
        },
        {
            title: 'Batch',
            field: 'BATCHNO',
            type: 'string',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.BATCHNO}
                </MainTableCell>
            )
        },
        {
            title: 'Submitted',
            field: 'RECEIVEDATE',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.RECEIVEDATE !== "N/A" ? format(new Date(rowData.RECEIVEDATE), 'MM/dd/yyyy') : rowData.RECEIVEDATE}
                </MainTableCell>
            )
        },
        {
            title: 'Proc State',
            field: 'PROCESSEDSTATE',
            type: 'string',
            width: '1em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.PROCESSEDSTATE}
                </MainTableCell>
            )
        },
        {
            title: '',
            field: 'detailsPopoverIcon',
            width: '1em',
            render: (rowData) => (
                <StyledMoreVertIcon onClick={(e) => handlePopoverOpen(e, rowData)} />
            ),
            hiddenByColumnsButton: true,
            filtering: false
        }
    ];

    return cols;
}
