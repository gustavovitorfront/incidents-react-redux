import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import { criticalites, types } from '../helpers/selectsData';
import { Button, Container, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import { FormControl } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';

const useStyles = makeStyles(() => ({
    textFieldStyle: {
        textAlign: "left",
    },
    formStyle: {
        margin: "0px auto",
        width: "100%"
    },
    switchStatus: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ['@media (min-width:780px)']: {
        marginLeft: 15
        },
        ['@media (max-width:780px)']: {
            marginLeft: 4
        }
    },
    typeStyle: {
        ['@media (min-width:780px)']: {
            marginLeft: '12px'
        }
    }
}))

const FormComponent = (props) => {

    const { title, description, criticality, type, status } = props.state;
    const error = props.error;

    const classes = useStyles();

    return (
        <Grid container spacing={1}>

            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <Box
                component="form"
                className={classes.formStyle}
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                onSubmit={props.handleSubmit}
            >

                <FormControl fullWidth>
                    <TextField
                        label="Título"
                        style={{ width: "100%" }}
                        type="text"
                        name="title"
                        value={title || ""}
                        variant="outlined"
                        className={classes.textFieldStyle}
                        required
                        onChange={props.handleInputChange}
                    />
                </FormControl>


                <FormControl fullWidth>
                    <TextField
                        label="Descrição"
                        name="description"
                        multiline
                        inputProps={{ maxLength: 255 }}
                        rows={2}
                        className={classes.textFieldStyle}
                        value={description || ""}
                        onChange={props.handleInputChange}
                    />
                </FormControl>

                <Grid container spacing="3">
                    <Grid item xs={5} sm={5}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label="Criticidade"
                                value={criticality || ""}
                                name="criticality"
                                onChange={props.handleInputChange}
                                className={classes.textFieldStyle}
                                required
                            >
                                {criticalites.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={5}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label="Tipo"
                                value={type || ""}
                                name="type"
                                onChange={props.handleInputChange}
                                className={classes.textFieldStyle}
                                required
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </FormControl>
                    </Grid>

                    <Grid item xs={2} sm={2}>
                        <FormGroup fullWidth className={classes.switchStatus}>
                            <FormControlLabel control={<Switch
                                value={status || ""}
                                checked={status ? true : false}
                                onChange={props.handleInputChange}
                                name="status" />} label="Status" />
                        </FormGroup>
                    </Grid>
                </Grid>
                   
                <Button sx={{float: "left", marginLeft: 1.1, width: '100%', marginTop: 1, padding: 1}} variant="contained" color="success" type="submit"><SaveIcon style={{ marginRight: 5 }} /> Salvar</Button>
            </Box >
        </Grid >
    )
}

export default FormComponent