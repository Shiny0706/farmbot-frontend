import thunk                          from "redux-thunk";
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { authReducer as auth }        from "./reducers/auth_reducer";
import { botReducer as bot }          from "./reducers/bot_reducer";
import { plantReducer as plants }     from "./reducers/plant_reducer";
import { oldGlobalReducer as global } from "./reducers/old_reducers";
import { routerReducer as routing }   from "react-router-redux";

let lastState = {};

let reducers = combineReducers({
  routing,
  auth,
  bot,
  plants,
  global
});

export let store = compose(applyMiddleware(thunk))(createStore)(reducers, lastState);
