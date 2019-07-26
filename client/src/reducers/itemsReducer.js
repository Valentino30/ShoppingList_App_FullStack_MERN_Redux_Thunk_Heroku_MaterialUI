import { GET_ITEMS, TOGGLE_ITEM, DELETE_ITEM, ADD_ITEM, UNLOAD_ITEMS } from "../actions/types";

const initialState = {
    items: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                items: action.payload
            }
        case UNLOAD_ITEMS:
            return {
                items: []
            }
        case TOGGLE_ITEM:
            return {
                items: state.items.map(item => {
                    if (item._id === action.payload._id) {
                        item.isChecked = !item.isChecked
                    }
                    return item
                })
            }
        case DELETE_ITEM:
            return {
                items: state.items.filter(item => item._id !== action.payload._id)
            }
        case ADD_ITEM:
            return {
                items: [action.payload, ...state.items]
            }
        default:
            return state;
    }
}