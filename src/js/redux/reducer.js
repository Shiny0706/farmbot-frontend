// The main reducer for the app. It:
// 1. Calls the `action.type` on the available `actions`.
// 2. Calls `actions.DEFAULT` if an unknown action is called (for debugging).
// 3. Stores the state into localStorage for hot reloads / persistence.

import { actions } from './actions';
import { appState } from './app_state';

export function reducer(state, action) {
  var newState = (actions[action.type] || actions.DEFAULT)(state, action);
  console.log(action.type);
  appState.saveState(newState);
  return newState;
};
