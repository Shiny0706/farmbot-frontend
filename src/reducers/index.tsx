import { combineReducers } from "redux";
import { authReducer as auth } from "./auth_reducer";
import { botReducer as bot } from "./bot_reducer";
import { plantReducer as plants } from "./plant_reducer";
import { oldGlobalReducer as global } from "./old_reducers";
import { routerReducer as routing }   from "react-router-redux";
export default combineReducers({
  routing,
  auth,
  bot,
  plants,
  global
});
