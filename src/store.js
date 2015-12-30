import { compose, createStore } from 'redux';
import middleware from './middleware';
import reducers from './reducers';

// Poor man's hot reloader.

var lastState = JSON.parse(localStorage["farmbot"] || "{auth: {}}");

export var store = compose(middleware)(createStore)(reducers, lastState);

if (lastState.auth.authenticated) {
  store.dispatch({ type: "LOGIN_OK", payload: lastState.auth });
};

function saveState(){
  localStorage["farmbot"] = JSON.stringify(store.getState());
}

store.subscribe(saveState);
