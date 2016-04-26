import thunk                          from "redux-thunk";
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { authReducer as auth } from "./reducers/auth_reducer";
import { sequenceReducer as sequences } from "./components/sequences/sequence_reducer";
import { botReducer as bot }          from "./reducers/bot_reducer";
import { plantReducer as plants }     from "./reducers/plant_reducer";
import { oldGlobalReducer as global } from "./reducers/old_reducers";
import { routerReducer }              from "react-router-redux";

let storageKey = "lastState";
let stateAsAString = sessionStorage[storageKey] || "{}";
let lastState = (JSON.parse(stateAsAString));

let reducers = combineReducers({
  routing: routerReducer,
  auth,
  bot,
  plants,
  sequences,
  global
});
declare var devToolsExtension: any;
let middleware = compose(applyMiddleware(thunk),
                         !!window["devToolsExtension"] ? devToolsExtension() : f => f);
export let store = createStore(reducers, lastState, middleware);
store.subscribe(function(){
  localStorage[storageKey] = JSON.stringify(store.getState());
});
