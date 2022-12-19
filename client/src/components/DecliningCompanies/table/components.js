import { TableToolbar } from '@aeros-ui/tables';
import { MTableBodyRow, MTableCell } from '@material-table/core';

export const components = (showFilters, handleFilterAction, handleDensityClick) => {
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
        Row: (props) => {
            return <MTableBodyRow id={props.data.id} {...props} />;
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
