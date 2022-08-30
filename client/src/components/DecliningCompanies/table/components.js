import { TableToolbar } from '@aeros-ui/tables';
import { MTableCell, MTableHeader } from '@material-table/core';

import { TablePagination } from '@mui/material';

export const components = (showFilters, setFiltering, handleDensityClick) => {
    return {
        Header: (props) => (
            <MTableHeader
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                {...props}
            />
        ),
        Pagination: (props) => (
            <TablePagination
                count={props.count}
                page={props.page}
                onPageChange={props.onPageChange}
                rowsPerPage={props.rowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
                onRowsPerPageChange={props.onRowsPerPageChange}
            />
        ),
        Cell: (props) => {
            return (
                <MTableCell
                    style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                    {...props}></MTableCell>
            );
        },
        Toolbar: (props) => (
            <TableToolbar
                {...props}
                showFilters={showFilters}
                onFilterClick={() => setFiltering(!showFilters)}
                onDensityClick={handleDensityClick}
            />
        )
    };
};
