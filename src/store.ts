import thunk from "redux-thunk";
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { authReducer as auth } from "./components/auth/auth_reducer";
import { sequenceReducer as sequences } from "./components/sequences/sequence_reducer";
import { botReducer as bot } from "./components/devices/bot_reducer";
import { configReducer as config } from "./components/config/config_reducer";
import { routerReducer as routing } from "react-router-redux";
import { regimensReducer as regimens } from "./components/regimens/reducer";
import { designer } from "./components/farm_designer/reducer";
import {
  BulkSchedulerReducer as bulkScheduler
} from "./components/regimens/bulk_scheduler/reducer";

// Activate dev tools (if the browser has them).
declare var devToolsExtension: any;
let reduxTools = !!window["devToolsExtension"] ? devToolsExtension() : (f: Function) => f;

let reducers = combineReducers({
  routing,
  auth,
  bot,
  sequences,
  regimens,
  bulkScheduler,
  config,
  designer
});
let storageKey = "lastState";
let lastState = JSON.parse(sessionStorage[storageKey] || "{}");
let middleware = compose(applyMiddleware(thunk), reduxTools);
export let store = createStore(reducers, lastState, middleware);
store.subscribe(function(){
  sessionStorage[storageKey] = JSON.stringify(store.getState());
});
