import { compose, createStore } from 'redux';
import reducers from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Poor man's hot reloader.

var lastState = JSON.parse(localStorage["farmbot"] || '{"auth": {}}');

export var store = compose(applyMiddleware(thunk))(createStore)(reducers, {auth: lastState.auth });

if (lastState.auth.authenticated) {
  store.dispatch({ type: "LOGIN_OK", payload: lastState.auth });
};

function saveState(){
  localStorage["farmbot"] = JSON.stringify(store.getState());
}

store.subscribe(saveState);
