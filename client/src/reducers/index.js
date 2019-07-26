import {combineReducers} from 'redux'
import itemsReducer from './itemsReducer';
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    item: itemsReducer,
    auth: authReducer,
    error: errorReducer
})