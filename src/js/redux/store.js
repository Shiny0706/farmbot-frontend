import { createStore } from 'redux';
import { appState } from './app_state';
import { reducer } from './reducer';

var store = createStore(reducer, appState.getState());

export { store };
