import { compose, createStore } from 'redux';
import reducers from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loginFromToken } from './actions/auth_actions';

// Poor man's hot reloader.
// var lastState = JSON.parse(localStorage["farmbot"] || '{}');
var lastState = {};
// delete lastState.bot;
// delete lastState.routing;

export var store = compose(applyMiddleware(thunk))(createStore)(reducers, lastState);

// var token = store.getState().auth.token;

// // If the user already had an auth token, log in.
// if (token) { store.dispatch(loginFromToken(token)); };

// function saveState(){
//   console.log(store.getState());
//   localStorage["farmbot"] = JSON.stringify(store.getState());
// }

// store.subscribe(saveState);
