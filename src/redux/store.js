//import { createStore, combineReducers, applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./userReducer"

// const rootReducer = combineReducers({
//     userReducer
// })


export default createStore(userReducer, applyMiddleware(promiseMiddleware));