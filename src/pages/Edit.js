import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import FormComponent from '../components/FormComponent'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSingleIncident, updateIncident } from '../redux/actions';
import { Container, Grid, makeStyles } from '@material-ui/core'
import BackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles(() => ({
    buttonBackIncident: {
        '@media (min-width: 780px)': {
            marginTop: "25px !important",
        },
        '@media (max-width: 780px)': {
            marginTop: "25px !important"
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
}));

const Edit = () => {

    const [state, setState] = useState({
        title: "",
        description: "",
        criticality: "",
        type: "",
        status: 0
    });

    const [error, setError] = useState("");
    let { id } = useParams();
    const { incident } = useSelector(state => state.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSingleIncident(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (incident) {
            setState({ ...incident });
        }
    }, [incident])

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'status') {
            setState({ ...state, [name]: e.target.checked })
        } else {
            setState({ ...state, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.title || !state.criticality || !state.type) {
            setError("Por favor preencha todos os campos requiridos.");
        } else {
            dispatch(updateIncident(state, id));
            navigate("/");
            setError("");
        }
    }

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <Grid container spacing={1}>
                <Grid item md={10} xs={6}>
                    <h2 className={classes.titlePage}>Editar <b>Incidente</b></h2>
                </Grid>

                <Grid item md={2} xs={6}>
                    <Button className={classes.buttonBackIncident} variant="contained" color="primary" onClick={() => navigate('/')}>
                        <BackIcon style={{ marginRight: 5 }} /> Voltar
                    </Button>
                </Grid>
            </Grid>

            <FormComponent
                state={state}
                error={error}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit} />
        </Container>
    )
}

export default Edit