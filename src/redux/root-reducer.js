import {combineReducers} from 'redux';
import incidentsReducers from './reducer';

const rootReducer = combineReducers({
    incidents: incidentsReducers
});

export default rootReducer;
