import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { labelsCriticalities, labelsCriticalitiesColor, labelStatus, labelsTypes } from '../helpers/labelsData';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TablePagination } from '@mui/material';

const useStyles = makeStyles(() => ({
    thStyle: {
        fontWeight: "bold !important"
    },
    criticalityStyle: {
        fontWeight: "bold !important"
    },
    boxCriticality: {
        width: 16,
        height: 16,
        borderRadius: 50,
        float: 'left',
        marginRight: 10
    },
    criticalityField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    criticalityFieldLabel: {
        minWidth: 43
    },
    mbButtonActions: {
        ['@media (max-width:780px)']: {
            width: "100%",
            marginBottom: 5
        }
    }
}))

const TableComponent = (props) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#2c3e50",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left" className={classes.thStyle} width="30%">Título</StyledTableCell>
                        <StyledTableCell align="center" className={classes.thStyle} width="5%">Criticidade</StyledTableCell>
                        <StyledTableCell align="center" className={classes.thStyle} width="5%">Tipo</StyledTableCell>
                        <StyledTableCell align="center" className={classes.thStyle} width="5%">Status</StyledTableCell>
                        <StyledTableCell align="center" className={classes.thStyle} width="15%">Ações</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.incidentsList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((incident) => (
                            <StyledTableRow key={incident.id}>
                                <StyledTableCell align="left">{incident.title}</StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className={classes.criticalityStyle}
                                    style={{ color: labelsCriticalitiesColor(incident.criticality) }}>
                                    <div className={classes.criticalityField}>
                                        <div className={classes.boxCriticality} style={{ backgroundColor: labelsCriticalitiesColor(incident.criticality) }}></div>
                                        <span className={classes.criticalityFieldLabel}>{labelsCriticalities(incident.criticality)}</span>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center">{labelsTypes(incident.type)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {labelStatus(incident.status)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        style={{ marginRight: 10 }}
                                        className={classes.mbButtonActions}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => props.handleDeleteIncident(incident.id)}>
                                        <DeleteIcon style={{ marginRight: 5 }} /> Remover
                                    </Button>
                                    <Button
                                        className={classes.mbButtonActions}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => props.handleEditIncient(incident.id)}>
                                        <EditIcon style={{ marginRight: 5 }} />Editar
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.incidentsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Quantidade por página"
            />
        </TableContainer>
    )
}

export default TableComponent