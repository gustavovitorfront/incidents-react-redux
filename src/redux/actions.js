import axios from "axios";
import * as types from "./actionType";

const getIncidents = (incidents) => ({
    type: types.GET_INCIDENTS,
    payload: incidents,
});

const incidentDeleted = () => ({
    type: types.DELETE_INCIDENT
});

const incidentAdded = () => ({
    type: types.ADD_INCIDENT
});

const incidentUpdated = () => ({
    type: types.UPDATE_INCIDENT
});

const getIncident = (incident) => ({
    type: types.GET_SINGLE_INCIDENT,
    payload: incident
});


export const loadIncidents = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            dispatch(getIncidents(resp.data));
        }).catch((error) => console.log(error));
    }
};

export const deleteIncident = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(incidentDeleted());
            dispatch(loadIncidents());
        }).catch((error) => console.log(error));
    }
};

export const addIncident = (incident) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, incident).then((resp) => {
            dispatch(incidentAdded());
            dispatch(loadIncidents());
        }).catch((error) => console.log(error));
    }
};

export const getSingleIncident = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(getIncident(resp.data));
        }).catch((error) => console.log(error));
    }
};

export const updateIncident = (incident, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, incident).then((resp) => {
            dispatch(incidentUpdated());
        }).catch((error) => console.log(error));
    }
};