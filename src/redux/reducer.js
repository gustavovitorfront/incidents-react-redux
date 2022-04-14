const initialState = {
    incidents: [],
    incident: {},
    loading: false
}

const incidentsReducers = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default incidentsReducers;