import {combineReducers} from 'redux';
import piti from './piti';

const rootReducer = combineReducers({
  pitiCalculator: piti
});

export default rootReducer;
