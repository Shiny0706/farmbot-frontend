import { actions } from './actions';
import { appState } from './app_state';

export function logAndSaveState(state, action) {
  console.log(action.type);
  appState.saveState(state);
  return state;
};

export function mainReducer(state, action) {
  return (actions[action.type] || actions.DEFAULT)(state, action);
};

export function routeReducer(state, action) {
  return state;
};

export function reducer(state, action) {
  var one = mainReducer(state, action);
  var two = routeReducer(one, action);
  var three = logAndSaveState(two, action);
  return three;
};
