import React, { useEffect, useState } from 'react'
import TableComponent from '../components/TableComponent'
import { useDispatch, useSelector } from "react-redux";
import { deleteIncident, loadIncidents } from '../redux/actions';
import { Button, Container, Grid } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@mui/icons-material/Add';
import ResponsiveDialog from '../components/ResponsiveDialog';

const useStyles = makeStyles(() => ({
    buttonNewIncident: {
        '@media (min-width: 780px)': {
            marginTop: '22px !important',
        },
        '@media (max-width: 780px)': {
            marginTop: '25px !important'
        },
        float: 'right'
    },
    titlePage: {
        fontSize: 28,
        '@media (min-width: 780px)': {
            textAlign: 'left',
            paddingLeft: 5
        },
        '@media (max-width: 780px)': {
            textAlign: 'center',
        },
        fontWeight: 100,
        color: "#2c3e50"
    },
    creditsA: {
        color: "#2c3e50",
        fontStyle: "italic",
        textDecoration: "none"
    }
}))

const Home = () => {

    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState("");

    let dispatch = useDispatch();
    const { incidents } = useSelector(state => state.data);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadIncidents());
    }, [dispatch]);

    const handleDelete = (id) => {

        handleClickOpen();
        setOpenId(id);
        // if (window.confirm("Tem certeza que quer deletar esse incidente?")) {
        //     dispatch(deleteIncident(id));
        // }
    }

    const handleConfirmDialog = () => {
        dispatch(deleteIncident(openId));
        handleClose();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <Grid
                container
                spacing={1}
                alignItems="center"
            >
                <Grid item md={10} xs={6}>
                    <h2 className={classes.titlePage}>🚨 My<b>Incidents</b></h2>
                </Grid>

                <Grid item md={2} xs={6}>
                    <Button className={classes.buttonNewIncident} variant="contained" color="primary" onClick={() => navigate('/add')}>
                        <AddIcon style={{ marginRight: 5 }} /> Novo Incidente
                    </Button>
                </Grid>
            </Grid>

            <TableComponent
                incidentsList={incidents}
                handleDeleteIncident={handleDelete}
                handleEditIncient={handleEdit} />

            <ResponsiveDialog
                title="Remover esse incidente?"
                description="Tem certeza que quer remover esse incidente, essa ação é irreversível."
                open={open}
                handleClose={handleClose}
                handleConfirm={handleConfirmDialog}
            />

            <h5>Feito por: <a rel="noreferrer" className={classes.creditsA} href='https://gustavovitor.info/' target="_blank">Gustavo Vitor</a></h5>
        </Container>
    )
}

export default Home