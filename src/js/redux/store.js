// A pretty basic Redux store, with default state provided by the 'appState'
// module (will look in localStorage for previous state when bootstrapping).
import { createStore, applyMiddleware, compose } from 'redux';
import { appState } from './app_state';
import { reducer } from './reducer';

var store = createStore(reducer, appState.getState());

export { store };
