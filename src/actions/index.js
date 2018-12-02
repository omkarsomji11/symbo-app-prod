import axios from 'axios';
import _ from 'lodash';
export const FETCH_DATA = 'FETCH_DATA';
export const PDP_DATA = 'PDP_DATA';
export const EMPTY_PDP_DATA = 'EMPTY_PDP_DATA';
export const SELECT_DATA = 'SELECT_DATA';
export const EMPTY_SELECT_DATA = 'EMPTY_SELECT_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export const fetchData = () => async dispatch => {
    const response = await axios.get('data.json');
    dispatch({ type: FETCH_DATA, payload: response})
};

export const getPdpData = id => async dispatch => {
    const response = await axios.get('data.json');
    const pdpPageData = response && response.data && response.data.content.find((data)=> id == data.plan.id);
    dispatch({  type: PDP_DATA, payload: pdpPageData })
}

export const selectToCompare = id => async (dispatch) => {
    const response = await axios.get('data.json');
    const selectedData = response && response.data && response.data.content.find((data)=> id == data.plan.id);
    dispatch({  type: SELECT_DATA, payload: selectedData});
}
 export const updateCompare = id => async (dispatch, getState) => {
    const updateData = getState() && getState().selectedData && getState().selectedData.filter((data) => id !== data.plan.id);
    dispatch({  type: UPDATE_DATA, payload: updateData});
}
export const emptyPdpData = () =>{
    return {
        type: EMPTY_PDP_DATA
    }
}

export const emptySelectedData = () =>{
    return {
        type: EMPTY_SELECT_DATA
    }
}