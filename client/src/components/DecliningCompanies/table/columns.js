import { TableFilterInput } from '@aeros-ui/tables';

export const columns = (hiddenList) => {
    return [
        {
            title: 'NAIC',
            field: 'naic',
            emptyValue: '-',
            type: 'string',
            width: '10em',
            hidden: hiddenList.length ? hiddenList[0] : false,
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
            field: 'companyName',
            emptyValue: '-',
            type: 'string',
            width: '30em',
            hidden: hiddenList.length ? hiddenList[1] : false,
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
            field: 'domicile',
            emptyValue: '-',
            type: 'string',
            width: '10em',
            hidden: hiddenList.length ? hiddenList[2] : false,
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
            field: 'orgType',
            emptyValue: '-',
            type: 'string',
            width: '30em',
            hidden: hiddenList.length ? hiddenList[3] : false,
            filterComponent: ({ columnDef, onFilterChanged }) => {
                return (
                    <TableFilterInput
                        onChange={(e) => onFilterChanged(columnDef.tableData.id, e.target.value)}
                    />
                );
            }
        }
    ];
};
