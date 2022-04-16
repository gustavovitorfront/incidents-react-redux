import { type } from "@testing-library/user-event/dist/type";
import * as types from "./actionType";

const initialState = {
    incidents: [],
    incident: {},
    loading: true
}

const incidentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_INCIDENTS:
            return {
                ...state,
                incidents: action.payload,
                loading: false,
            };
        case types.DELETE_INCIDENT:
        case types.ADD_INCIDENT:
        case types.UPDATE_INCIDENT:
            return {
                ...state,
                loading: false
            }
        case types.GET_SINGLE_INCIDENT:
            return {
                ...state,
                incident: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default incidentsReducers;