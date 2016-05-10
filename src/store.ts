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
import { plantReducer as plants } from "./reducers/plant_reducer";
import { configReducer as config } from "./components/config/config_reducer";
import { routerReducer as routing } from "react-router-redux";
// Activate dev tools (if the browser has them).
declare var devToolsExtension: any;
let reduxTools = !!window["devToolsExtension"] ? devToolsExtension() : (f) => f;

let reducers = combineReducers({
  routing,
  auth,
  bot,
  plants,
  sequences,
  config
});
let storageKey = "lastState";
let lastState = JSON.parse(sessionStorage[storageKey] || "{}");
let middleware = compose(applyMiddleware(thunk), reduxTools);
export let store = createStore(reducers, lastState, middleware);
store.subscribe(function(){
  sessionStorage[storageKey] = JSON.stringify(store.getState());
});
