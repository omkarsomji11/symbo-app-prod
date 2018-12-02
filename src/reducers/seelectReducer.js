import {SELECT_DATA, EMPTY_SELECT_DATA, UPDATE_DATA} from '../actions';

export default function(state=[],action){
    switch(action.type){
        case SELECT_DATA: return [...state, action.payload];
        case UPDATE_DATA: return Object.assign([], state.selectedData, action.payload);
        case EMPTY_SELECT_DATA: return [];
        default: return state;
    }
}