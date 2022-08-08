import { combineReducers } from 'redux'
import userReducer from './userReducer'
import doingReducer from './doingReducer'

const rootReducer = combineReducers({ user:userReducer, doings:doingReducer })

export default rootReducer