import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { logger } from "redux-logger";
import rootReducer from "./reducers/rootReducer";

let store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger)
);

export default store;
