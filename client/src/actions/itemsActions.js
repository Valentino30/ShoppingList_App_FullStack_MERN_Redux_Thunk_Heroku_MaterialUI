import { GET_ITEMS, TOGGLE_ITEM, DELETE_ITEM, ADD_ITEM, UNLOAD_ITEMS } from "./types";
import axios from 'axios'
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch, getState) => (
    axios
        .get('/api/items', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
)

export const unloadItems = () => (dispatch) => (
    dispatch({ type: UNLOAD_ITEMS }))

export const toggleItem = item => (dispatch, getState) => (
    axios
        .put('/api/items/' + item._id, { item }, tokenConfig(getState))
        .then(res => dispatch({
            type: TOGGLE_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
)

export const deleteItem = id => (dispatch, getState) => (

    axios
        .delete('/api/items/' + id, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
)

export const addItem = itemName => (dispatch, getState) => (
    axios
        .post('/api/items/', { "itemName": itemName }, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ))
)