import { Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import { NestedColumnHeaders, NestedTableHeader, NestedTableCell, NestedTableRow } from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import { format, isValid } from 'date-fns';

const StyledMoreVertIcon = styled(MoreVert)(({ theme }) => ({
    height: 32,
    width: 18,
    display: 'flex',
    color: 'gray',
    '&:hover': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    },
    '&:active': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    },
    '&:focus': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.main.active,
        padding: 0,
        color: 'gray'
    }
}));



const NestedTable = ({rowData, selectedChildId, handlePopoverOpen}) => {

    let columnHeaders = [
        "Affidavit No",
        "Policy No",
        "Insured Name",
        "Type",
        "Premium",
        "Inception",
        "Expiration",
        "Batch",
        "Submitted",
        "Proc State",
        ""
    ]

    const NO_VALUE = "-";

    return (
        <TableContainer >
            <Table>
                <NestedTableHeader
                    tableHeader="Related Child Transactions"
                    colSpan={11}
                    dense="dense"
                    sx={{pl: 5}}
                />
                <NestedColumnHeaders
                    columnHeaders={columnHeaders}
                    dense="dense"
                />
                <TableBody>
                    {rowData.CHILDTRANSACTIONS.map((c, i) => (
                        <NestedTableRow 
                        key={`child-transaction-${i}`} 
                        dense="dense" 
                        // onClick={() => handleSelectChild(c)} 
                        selected={c.id === selectedChildId}
                        >
                            <NestedTableCell dense="dense" width={"10em"}>{c.AFFIDAVITNO ? c.AFFIDAVITNO : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"10em"}>{c.POLICYNO ? c.POLICYNO : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"15em"} >{c.RISKINSUREDNAME ? c.RISKINSUREDNAME : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.TRANSACTIONTYPE ? c.TRANSACTIONTYPE : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.AMOUNT ? c.AMOUNT : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.EFFECTIVEDATE ? format(new Date(c.EFFECTIVEDATE), 'MM/dd/yyyy') : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.EXPIRATIONDATE ? format(new Date(c.EXPIRATIONDATE), 'MM/dd/yyyy') : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.BATCHNO ? c.BATCHNO : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"5em"}>{c.RECEIVEDATE ? format(new Date(c.RECEIVEDATE), 'MM/dd/yyyy') : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" align={"center"} width={"4em"}>{c.PROCESSEDSTATE ? c.PROCESSEDSTATE : NO_VALUE}</NestedTableCell>
                            <NestedTableCell dense="dense" width={"1em"}>
                                <StyledMoreVertIcon onClick={(e) => handlePopoverOpen(e, rowData)} 
                                />
                            </NestedTableCell>
                        </NestedTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NestedTable;