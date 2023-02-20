import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';
import { Tooltip } from '@mui/material';

export const columns = [
    {
        title: 'NAIC',
        field: 'NAIC',
        type: 'string',
        width: '8em',
        align: 'right',
        hidden: false,
        render: (rowData) => <MainTableCell>{rowData.NAIC}</MainTableCell>,
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        }
    },
    {
        title: 'Company Name',
        field: 'COMPANYNAME',
        type: 'string',
        cellStyle: {
            maxWidth: '250px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        hidden: false,
        render: (rowData) => (
            <MainTableCell
                style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }}>
                {rowData.COMPANYNAME ? (
                    <Tooltip
                        title={rowData.COMPANYNAME}
                        disableHoverListener={
                            rowData.COMPANYNAME && rowData.COMPANYNAME.length > 30 ? false : true
                        }>
                        <span>{rowData.COMPANYNAME}</span>
                    </Tooltip>
                ) : (
                    ''
                )}
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
        title: 'Domicile',
        field: 'DOMICILE',
        type: 'string',
        width: '10em',
        hidden: false,
        render: (rowData) => <MainTableCell>{rowData.DOMICILE}</MainTableCell>,
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        }
    },
    {
        title: 'Organizaton Type',
        field: 'ORGTYPE',
        type: 'string',
        cellStyle: {
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        hidden: false,
        render: (rowData) => (
            <MainTableCell
                style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }}>
                {rowData.ORGTYPE ? (
                    <Tooltip
                        title={rowData.ORGTYPE}
                        disableHoverListener={
                            rowData.ORGTYPE && rowData.ORGTYPE.length > 30 ? false : true
                        }>
                        <span>{rowData.ORGTYPE}</span>
                    </Tooltip>
                ) : (
                    ''
                )}
            </MainTableCell>
        ),
        filterComponent: ({ columnDef, onFilterChanged }) => {
            return (
                <TableFilterInput
                    onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                />
            );
        }
    }
];
