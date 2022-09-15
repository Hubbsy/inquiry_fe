import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';

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
            field: 'LICENSENO',
            type: 'string',
            width: '10%',
            hidden: !showLicenseCol
        },
        {
            title: 'Affidavit No.',
            field: 'AFFIDAVITNO',
            headerStyle: {
                whiteSpace: 'nowrap'
            },
            type: 'string',
            width: '10%'
        },
        {
            title: 'Policy No.',
            field: 'POLICYNO',
            type: 'string',
            width: '14%'
        },
        {
            title: 'Insured Name',
            field: 'RISKINSUREDNAME',
            type: 'string',
            width: '19%'
        },
        {
            title: 'Type',
            field: 'TRANSACTIONTYPE',
            type: 'string',
            width: '4%'
        },
        {
            title: 'Premium',
            field: 'AMOUNT',
            type: 'string',
            width: '8%',
            customSort: (a, b) =>
                parseFloat(a.AMOUNT.replace(',', '.')) - parseFloat(b.AMOUNT.replace(',', '.'))
        },
        {
            title: 'Inception',
            field: 'EFFECTIVEDATE',
            width: '8%'
        },
        {
            title: 'Expiration',
            field: 'EXPIRATIONDATE',
            width: '8%'
        },
        {
            title: 'Batch',
            field: 'BATCHNO',
            type: 'string',
            width: '8%'
        },
        {
            title: 'Submitted',
            field: 'RECEIVEDATE',
            width: '8%'
        },
        {
            title: 'Proc State',
            field: 'PROCESSEDSTATE',
            type: 'string',
            width: '5%',
            align: 'center'
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
