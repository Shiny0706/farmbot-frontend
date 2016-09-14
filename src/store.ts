import thunk from "redux-thunk";
import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { authReducer as auth } from "./auth/reducer";
import { sequenceReducer as sequences } from "./sequences/reducer";
import { botReducer as bot } from "./devices/reducer";
import { configReducer as config } from "./config/reducer";
import { routerReducer as routing } from "react-router-redux";
import { regimensReducer as regimens } from "./regimens/reducer";
import { tickerReducer as ticker } from "./ticker/reducer";
import { designer } from "./farm_designer/reducer";
import {
  BulkSchedulerReducer as bulkScheduler
} from "./regimens/bulk_scheduler/reducer";

console.log(`Environment is ${process.env.NODE_ENV}`);

let reducers = combineReducers({
  routing,
  auth,
  bot,
  sequences,
  regimens,
  bulkScheduler,
  config,
  designer,
  ticker
});

function configureStore(options = {}) {
  let store;
  // if (process.env.NODE_ENV === "development") {
  //   let lastState = JSON.parse(sessionStorage["lastState"] || "{}");
  //   store = createStore(reducers, lastState, applyMiddleware(thunk));
  //   store.subscribe(function () {
  //     sessionStorage["lastState"] = JSON.stringify(store.getState());
  //   });
  // } else {
    store = createStore(reducers, {}, applyMiddleware(thunk));
  // };
  return store;
}

export let store = configureStore();
