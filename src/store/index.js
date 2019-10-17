import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise";
import createSagaMiddleware from "redux-saga";
import diyReduxPromise from "../diy-redux-promise";
import * as reducers from "./reducers";
import saga from "./saga";
// init state from server
// const initState = {
//   todo: [1],
//   visible: false
// };

const sagaMiddleware = createSagaMiddleware();

const reduce = combineReducers(reducers);
export const store = createStore(
  reduce,
  // initState,
  applyMiddleware(
    thunk,
    reduxPromise,
    diyReduxPromise,
    sagaMiddleware,
    createLogger({
      collapsed: false
    })
  )
);

sagaMiddleware.run(saga);
