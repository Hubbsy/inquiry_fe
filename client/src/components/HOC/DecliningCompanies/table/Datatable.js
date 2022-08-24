import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { columns } from './columns';
import { options } from './options';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { ThemeProvider } from '@mui/material/styles';
import { tableTheme } from '@aeros-ui/themes';

const DataTable = ({ rows }) => {
    {
        {
            console.log(rows);
        }
    }
    return (
        <ThemeProvider theme={tableTheme}>
            <MaterialTable
                title=''
                columns={columns}
                options={{
                    ...options,
                    exportMenu: [
                        {
                            label: 'Export PDF',
                            exportFunc: (cols, datas) =>
                                ExportPdf(cols, datas, 'Declining_Companies')
                        },
                        {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, 'Declining_Companies')
                        }
                    ]
                }}
                data={rows}
                // components={{
                //     Cell: (props) => {
                //         console.log(props);
                //         return <MTableCell {...props}></MTableCell>;
                //     },
                //     Row: (props) => <MTableBodyRow {...props} />
                // }}
            ></MaterialTable>
        </ThemeProvider>
    );
};

DataTable.propTypes = {
    rowData: PropTypes.object,
    rows: PropTypes.array
};

export default DataTable;
