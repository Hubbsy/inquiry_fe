import { MainTableCell } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';

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
            field: 'affidavitNo',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.affidavitNo}
                </MainTableCell>
            )
        },
        {
            title: 'Policy No.',
            field: 'policyNo',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.policyNo}
                </MainTableCell>
            )
        },
        {
            title: 'Insured Name',
            field: 'insuredName',
            type: 'string',
            width: '30em',
            render: (rowData) => (
                <MainTableCell sx={{ whiteSpace: 'nowrap' }}>{rowData.insuredName}</MainTableCell>
            )
        },
        {
            title: 'Type',
            field: 'type',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.type}
                </MainTableCell>
            )
        },
        {
            title: 'Premium',
            field: 'premium',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.premium}
                </MainTableCell>
            )
        },
        {
            title: 'Inception',
            field: 'inceptionDate',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.inceptionDate), 'MM/dd/yyyy')}
                </MainTableCell>
            )
        },
        {
            title: 'Expiration',
            field: 'expDate',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.expDate), 'MM/dd/yyyy')}
                </MainTableCell>
            )
        },
        {
            title: 'Batch',
            field: 'batch',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.batch}
                </MainTableCell>
            )
        },
        {
            title: 'Submitted',
            field: 'submitted',
            type: 'string',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.submitted}
                </MainTableCell>
            )
        },
        {
            title: 'Proc State',
            field: 'procState',
            type: 'string',
            width: '5em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.procState}
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
