import {combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import pdpReducer from './pdpReducer';
import selectReducer from './seelectReducer';
export default combineReducers({
    browse: fetchReducer,
    pdpData: pdpReducer,
    selectedData: selectReducer
});