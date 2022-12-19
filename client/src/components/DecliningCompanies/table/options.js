export const options = (theme, ExportCsv, ExportPdf, showFilters, density, rows) => {
    return {
        Selection: true,
        columnsButton: true,
        exportAllData: true,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: rows.length ? false : true,
        cellStyle: theme.typography,
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
        headerStyle: {
            ...theme.components.headerStyle,
            backgroundColor: theme.palette.grid.main.header,
            padding: '0.7em 2em'
        },

        exportMenu: [
            {
                label: 'Export PDF',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Declining Companies Inquiry')
            },
            {
                label: 'Export CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Declining Companies Inquiry')
            }
        ],
        filtering: showFilters,
        padding: density
    };
};
