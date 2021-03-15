import { combineReducers } from "redux";
import auth from "./authReduce";
import user from "./userReducer";

const rootReducer = combineReducers({ user, auth });
export default rootReducer;
