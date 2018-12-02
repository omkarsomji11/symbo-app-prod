import {FETCH_DATA, PDP_DATA, EMPTY_PDP_DATA} from '../actions';
  
export default function(state=[],action){
    switch(action.type){
        case FETCH_DATA: return Object.assign({}, state,{data: action.payload});
        default: return state;
    }
}