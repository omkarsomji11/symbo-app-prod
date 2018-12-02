import {PDP_DATA, EMPTY_PDP_DATA} from '../actions';

export default function(state=[],action){
    switch(action.type){
        case PDP_DATA: return Object.assign({}, state, {data: action.payload});
        case EMPTY_PDP_DATA: return Object.assign({}, state.pdpData, null);
        default: return state;
    }
}