import {combineReducers} from 'redux';
import incidentsReducers from './reducer';

const rootReducer = combineReducers({
    data: incidentsReducers
});

export default rootReducer;
