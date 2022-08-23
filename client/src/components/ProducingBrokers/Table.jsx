import MaterialTable from '@material-table/core';
import {TablePagination, useTheme, styled, ThemeProvider} from "@mui/material";
import {tableTheme} from '@aeros-ui/themes'

export default function Table() {

    const theme = useTheme();

    const options = {
        pageSize: 10,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor:  theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: "capitalize",
        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow === rowData.tableData.id ? theme.palette.success.light : theme.palette.background.paper
        }),
        exportAllData: true,
        exportMenu: [
            {
                label: "Export as PDF",
                exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "RSIData"),
            },
            {
                label: "Export as CSV",
                exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "RSIData"),
            },
        ],
        columnsButton: true,
        // filtering: activeTableFilters,
    }

    return (
        <div style={{margin: "15px 25px"}}>
            <ThemeProvider theme={tableTheme}>
                <MaterialTable 
                    title={""}
                    options={options}
                    components={{
                        Pagination: (props) =>
                            <TablePagination
                                count={props.count}
                                page={props.page}
                                onPageChange={props.onPageChange}
                                rowsPerPage={props.rowsPerPage}
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                onRowsPerPageChange={props.onRowsPerPageChange}
                            />,
                   }}/>
            </ThemeProvider>

        </div>
    )
}