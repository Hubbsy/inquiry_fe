import { Button, Grid, Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
    NestedColumnHeaders,
    NestedTableHeader,
    NestedTableCell,
    NestedTableRow,
    DetailCard
} from '@aeros-ui/tables';
import styled from '@emotion/styled';
import { MoreVert } from '@mui/icons-material';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
        backgroundColor: theme.palette.grid.nested.active,
        padding: 0,
        color: 'gray'
    },
    '&:active': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.nested.active,
        padding: 0,
        color: 'gray'
    },
    '&:focus': {
        height: 32,
        width: 18,
        borderRadius: '50%',
        backgroundColor: theme.palette.grid.nested.active,
        padding: 0,
        color: 'gray'
    }
}));

const NestedTable = ({ rowData, dense }) => {
    const [selectedChild, setSelectedChild] = useState(null);
    const [nestedAnchorEl, setNestedAnchorEl] = useState(null);
    const nestedPopoverOpen = Boolean(nestedAnchorEl);

    const compileFullAddress = (options) => {
        return {
            line1: `${options.riskAddress}`,
            line2: `${options.city}, ${options.state}, ${options.zip}`
        };
    };

    const handleNestedPopoverOpen = (event, childRowData) => {
        rowData.PARTA_TRANSACTION.companyDetails.address = compileFullAddress(
            rowData.PARTA_TRANSACTION.companyDetails
        );
        const anchorPosition = anchorPositionByAnchorEl(event);
        setNestedAnchorEl(anchorPosition);
        setSelectedChild(childRowData);
    };

    const handleCloseNestedPopover = () => {
        setNestedAnchorEl(null);
        setSelectedChild(null);
    };

    const anchorPositionByAnchorEl = (event) => {
        const elementDetailedPosition = event.currentTarget.getBoundingClientRect();
        const anchorPosition = {
            left: elementDetailedPosition.left + elementDetailedPosition.width / 2,
            top: elementDetailedPosition.top + elementDetailedPosition.height
        };
        return anchorPosition;
    };

    let columnHeaders = [
        'Affidavit No',
        'Policy No',
        'Insured Name',
        'Type',
        'Premium',
        'Inception',
        'Expiration',
        'Batch',
        'Submitted',
        'Proc State'
    ];

    const NO_VALUE = '-';
    const nestedId = nestedPopoverOpen ? 'nested-popover' : undefined;

    return (
        <TableContainer>
            <Table>
                <NestedTableHeader
                    tableHeader='Related Child Transactions'
                    colSpan={columnHeaders.length + 1}
                    dense={dense}
                />
                <NestedColumnHeaders columnHeaders={columnHeaders} dense={dense} />
                <TableBody>
                    {rowData.PARTA_TRANSACTION.CHILD_TRANSACTION.map((c, i) => (
                        <NestedTableRow
                            key={`child-transaction-${i}`}
                            dense={dense}
                            selected={
                                selectedChild !== null &&
                                c.TRANSACTION_ID === selectedChild.TRANSACTION_ID
                            }
                        >
                            <NestedTableCell dense='dense'>
                                {c.AFFIDAVITNO ? c.AFFIDAVITNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.POLICYNO ? c.POLICYNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width='200px'>
                                {c.RISKINSUREDNAME ? c.RISKINSUREDNAME : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.TRANSACTIONTYPE ? c.TRANSACTIONTYPE : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.AMOUNT ? c.AMOUNT : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.EFFECTIVEDATE
                                    ? format(new Date(c.EFFECTIVEDATE), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.EXPIRATIONDATE
                                    ? format(new Date(c.EXPIRATIONDATE), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.BATCHNO ? c.BATCHNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                {c.RECEIVEDATE
                                    ? format(new Date(c.RECEIVEDATE), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense'>
                                <Grid
                                    item
                                    container
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Typography variant='body2'>
                                        {c.PROCESSEDSTATE ? c.PROCESSEDSTATE : NO_VALUE}
                                    </Typography>
                                    <StyledMoreVertIcon
                                        aria-describedby={nestedId}
                                        onClick={(e) => handleNestedPopoverOpen(e, c)}
                                    />
                                    {selectedChild !== null ? (
                                        <DetailCard
                                            popoverId={nestedId}
                                            open={nestedPopoverOpen}
                                            width={300}
                                            anchorPosition={nestedAnchorEl}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            handleClose={() => handleCloseNestedPopover()}
                                            title={`Affidavit No. ${selectedChild.AFFIDAVITNO}`}
                                            content={
                                                <Grid container>
                                                    <Grid item container>
                                                        <Typography
                                                            sx={{ mb: 0 }}
                                                            variant='subtitle2'
                                                            gutterBottom
                                                        >
                                                            Risk Address:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container sx={{ pb: 1 }}>
                                                        <Stack>
                                                            <Typography
                                                                variant='body2'
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                {rowData.PARTA_TRANSACTION
                                                                    .companyDetails.address
                                                                    ? rowData.PARTA_TRANSACTION
                                                                          .companyDetails.address
                                                                          .line1
                                                                    : ''}
                                                            </Typography>
                                                            <Typography
                                                                variant='body2'
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                {rowData.PARTA_TRANSACTION
                                                                    .companyDetails.address
                                                                    ? rowData.PARTA_TRANSACTION
                                                                          .companyDetails.address
                                                                          .line2
                                                                    : ''}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Typography
                                                            sx={{ mb: 0 }}
                                                            variant='subtitle2'
                                                            gutterBottom
                                                        >
                                                            Company(s):
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container sx={{ pb: 1 }}>
                                                        <Stack>
                                                            <Typography
                                                                variant='body2'
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                {
                                                                    rowData.PARTA_TRANSACTION
                                                                        .companyDetails.company
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Typography
                                                            sx={{ mb: 0 }}
                                                            variant='subtitle2'
                                                            gutterBottom
                                                        >
                                                            Coverage:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container sx={{ pb: 1 }}>
                                                        <Stack>
                                                            <Typography
                                                                variant='body2'
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                {
                                                                    rowData.PARTA_TRANSACTION
                                                                        .companyDetails.coverage
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Typography
                                                            sx={{ mb: 0 }}
                                                            variant='subtitle2'
                                                            gutterBottom
                                                        >
                                                            Risk:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Stack>
                                                            <Typography
                                                                variant='body2'
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                {
                                                                    rowData.PARTA_TRANSACTION
                                                                        .companyDetails.risk
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            }
                                            actions={
                                                <Grid item container justifyContent='flex-end'>
                                                    <Button
                                                        href={selectedChild.BATCHLINK}
                                                        variant='outlined'
                                                        startIcon={
                                                            selectedChild.BATCHLINKEDITVIEW ===
                                                            'VIEW' ? (
                                                                <FontDownloadIcon />
                                                            ) : (
                                                                <ModeEditIcon />
                                                            )
                                                        }
                                                        size='small'
                                                    >
                                                        {selectedChild.BATCHLINKEDITVIEW} Affidavit
                                                    </Button>
                                                </Grid>
                                            }
                                        />
                                    ) : null}
                                </Grid>
                            </NestedTableCell>
                        </NestedTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NestedTable;
