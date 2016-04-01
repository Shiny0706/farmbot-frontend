import thunk                          from 'redux-thunk';
import { compose, createStore }       from 'redux';
import { applyMiddleware }            from 'redux';
import { loginFromToken }             from './actions/auth_actions';
import { combineReducers }            from 'redux';
import { authReducer as auth }        from './reducers/auth_reducer';
import { botReducer as bot }          from './reducers/bot_reducer';
import { plantReducer as plants }     from './reducers/plant_reducer'
import { oldGlobalReducer as global } from './reducers/old_reducers';
import { routeReducer as routing }    from './reducers/routing_reducer';

let lastState = {};

let reducers = combineReducers({
  routing,
  auth,
  bot,
  plants,
  global
});

export let store = compose(applyMiddleware(thunk))(createStore)(reducers, lastState);
