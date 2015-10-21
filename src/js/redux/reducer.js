import { actions } from './actions';
import { appState } from './app_state';

export function reducer(state, action) {
  console.log(action.type)
  var outcome = (actions[action.type] || actions.DEFAULT)(state, action);
  appState.saveState(outcome);
  return outcome;
};
