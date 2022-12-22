import { TableToolbar } from '@aeros-ui/tables';
import { MTableBodyRow, MTableCell } from '@material-table/core';

export const components = (showFilters, handleFilterAction, handleDensityClick) => {
    return {
        Cell: (props) => {
            return (
                <MTableCell
                    sx={{
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
                onFilterClick={handleFilterAction}
                onDensityClick={handleDensityClick}
            />
        )
    };
};
