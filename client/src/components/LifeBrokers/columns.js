import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
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

const columns = (handlePopoverOpen) => {
    return [
        {
            title: 'License No.',
            field: 'licenseNo',
            type: 'string',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {rowData.licenseNo}
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
            title: 'Name',
            field: 'brokerName',
            type: 'string',
            width: '50em',
            render: (rowData) => (
                <MainTableCell sx={{ whiteSpace: 'nowrap' }}>{rowData.brokerName}</MainTableCell>
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
            title: 'Effective Date',
            field: 'effectiveDate',
            width: '15em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.effectiveDate.replace(/-/g, '/')), 'MM/dd/yyyy')}
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
            title: 'Expiration Date',
            field: 'expDate',
            width: '10em',
            render: (rowData) => (
                <MainTableCell sx={{ width: { xs: '0.5em', sm: '5em' } }}>
                    {format(new Date(rowData.expDate.replace(/-/g, '/')), 'MM/dd/yyyy')}
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
};

export default columns;
