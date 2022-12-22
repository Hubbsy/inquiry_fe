import { MainTableCell, TableFilterInput } from '@aeros-ui/tables';

export const columns = (hiddenList, handleOrgType) => {
    return [
        {
            title: 'NAIC',
            field: 'NAIC',
            type: 'string',
            width: '10em',
            hidden: hiddenList.length ? hiddenList[0] : false,
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
            width: '30em',
            hidden: hiddenList.length ? hiddenList[1] : false,
            render: (rowData) => (
                <MainTableCell
                    style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}>
                    {rowData.COMPANYNAME}
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
            defaultFilter: '',
            hidden: hiddenList.length ? hiddenList[2] : false,
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
            width: '30em',
            hidden: hiddenList.length ? hiddenList[3] : false,
            render: (rowData) => <MainTableCell>{handleOrgType(rowData.ORGTYPE)}</MainTableCell>,
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            },
            customFilterAndSearch: (term, rowData) => {
                const filteredOrgType = handleOrgType(rowData.ORGTYPE);
                return filteredOrgType
                    ? filteredOrgType.startsWith(term.toUpperCase())
                    : rowData.ORGTYPE.startsWith(term.toUpperCase());
            }
        }
    ];
};
