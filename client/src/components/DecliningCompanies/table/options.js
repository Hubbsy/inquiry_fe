export const options = (theme, ExportCsv, ExportPdf, showFilters, density, data) => {
    return {
        columnsButton: true,
        exportAllData: true,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: data.length ? false : true,
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
                exportFunc: (cols, data) => ExportPdf(cols, data, 'Declining Companies Inquiry')
            },
            {
                label: 'Export CSV',
                exportFunc: (cols, data) => ExportCsv(cols, data, 'Declining Companies Inquiry')
            }
        ],
        filtering: showFilters,
        padding: density
    };
};
