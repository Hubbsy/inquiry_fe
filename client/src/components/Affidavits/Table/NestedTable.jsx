import { Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import { NestedColumnHeaders, NestedTableHeader, NestedTableCell, NestedTableRow } from '@aeros-ui/tables';

const NestedTable = ({rowData, selectedChildId}) => {

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
    ]

    return (
        <TableContainer >
            <Table>
                <NestedTableHeader
                    tableHeader="Related Child Transactions"
                    colSpan={10}
                    dense="dense"
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
                        onClick={() => handleSelectChild(c)} 
                        selected={c.id === selectedChildId}
                        >
                            <NestedTableCell dense="dense">{c.AFFIDAVITNO}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.POLICYNO}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.RISKINSUREDNAME !== null ? c.RISKINSUREDNAME : "-"}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.TRANSACTIONTYPE}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.AMOUNT}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.EFFECTIVEDATE}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.EXPIRATIONDATE !== null ? c.EXPIRATIONDATE : "-"}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.BATCHNO}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.RECEIVEDATE}</NestedTableCell>
                            <NestedTableCell dense="dense">{c.PROCESSEDSTATE}</NestedTableCell>
                        </NestedTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NestedTable;