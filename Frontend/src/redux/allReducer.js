import roomId from "./roomIdReducer";
import loginReducer from "./loginReducer";
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    user: loginReducer,
    roomId:roomId,
})

export default allReducers