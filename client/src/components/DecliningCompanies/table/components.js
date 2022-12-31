import { TableToolbar } from '@aeros-ui/tables';
import { MTableCell } from '@material-table/core';

export const components = (showFilters, setFiltering, handleDensityClick) => {
    return {
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
