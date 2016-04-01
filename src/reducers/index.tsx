import { combineReducers } from 'redux';
import { authReducer as auth } from './auth_reducer';
import { botReducer as bot } from './bot_reducer';
import { plantReducer as plants } from './plant_reducer'
import { oldGlobalReducer as global } from './old_reducers';
import { routeReducer as routing } from './routing_reducer';
// import { routeReducer as routing } from './routing_reducer';
export default combineReducers({
  routing,
  auth,
  bot,
  plants,
  global
});
