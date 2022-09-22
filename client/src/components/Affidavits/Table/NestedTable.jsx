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

const NestedTable = ({ rowData }) => {
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
        'Proc State',
        ''
    ];

    const NO_VALUE = '-';
    const nestedId = nestedPopoverOpen ? 'nested-popover' : undefined;

    return (
        <TableContainer>
            <Table>
                <NestedTableHeader
                    tableHeader='Related Child Transactions'
                    colSpan={11}
                    dense='dense'
                    sx={{ pl: 5 }}
                />
                <NestedColumnHeaders columnHeaders={columnHeaders} dense='dense' />
                <TableBody>
                    {rowData.PARTA_TRANSACTION.CHILD_TRANSACTION.map((c, i) => (
                        <NestedTableRow
                            key={`child-transaction-${i}`}
                            dense='dense'
                            onClick={() => {
                                setSelectedChild(c);
                            }}
                            selected={
                                selectedChild !== null &&
                                c.TRANSACTION_ID === selectedChild.TRANSACTION_ID
                            }
                        >
                            <NestedTableCell dense='dense' width={'14em'}>
                                {c.AFFIDAVITNO ? c.AFFIDAVITNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'15em'}>
                                {c.POLICYNO ? c.POLICYNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'26em'}>
                                {c.RISKINSUREDNAME ? c.RISKINSUREDNAME : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'5em'}>
                                {c.TRANSACTIONTYPE ? c.TRANSACTIONTYPE : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'12em'}>
                                {c.AMOUNT ? c.AMOUNT : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'8em'}>
                                {c.EFFECTIVEDATE
                                    ? format(new Date(c.EFFECTIVEDATE.replace(/-/g, '/')), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'10em'}>
                                {c.EXPIRATIONDATE
                                    ? format(new Date(c.EXPIRATIONDATE.replace(/-/g, '/')), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'10em'}>
                                {c.BATCHNO ? c.BATCHNO : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'8em'}>
                                {c.RECEIVEDATE
                                    ? format(new Date(c.RECEIVEDATE.replace(/-/g, '/')), 'MM/dd/yyyy')
                                    : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' align={'center'} width={'4em'}>
                                {c.PROCESSEDSTATE ? c.PROCESSEDSTATE : NO_VALUE}
                            </NestedTableCell>
                            <NestedTableCell dense='dense' width={'1em'}>
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
                                                                      .companyDetails.address.line1
                                                                : ''}
                                                        </Typography>
                                                        <Typography
                                                            variant='body2'
                                                            sx={{ textTransform: 'none' }}
                                                        >
                                                            {rowData.PARTA_TRANSACTION
                                                                .companyDetails.address
                                                                ? rowData.PARTA_TRANSACTION
                                                                      .companyDetails.address.line2
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
                            </NestedTableCell>
                        </NestedTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NestedTable;
