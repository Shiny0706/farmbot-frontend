import { routeReducer as routing } from 'react-router-redux';
import { CONFIG } from '../config';

let DEFAULT_WELCOME_PAGE = CONFIG.ROOT_PATH + "dashboard";
let initialState = {
  changeId: 1,
  path: undefined,
  state: undefined,
  replace: false
}

// I needed to sprinkle some extra magic ontop of react-router-redux, so I
// wrapped the function.
export function routeReducer(state=initialState, { type, payload }) {
  let newState;
  switch(type) {
    case "LOGIN_OK":
      newState = _.assign({}, state, {
        attemptedURL: null,
        path: state.attemptedURL || DEFAULT_WELCOME_PAGE,
        changeId: state.changeId + 1,
        state: payload.state,
        replace: true //payload.replace
      })
      break;
    case "LOGIN_REQUIRED":
      newState = _.assign({}, state, {
        path: CONFIG.ROOT_PATH + 'login',
        attemptedURL: payload.attemptedURL,
        changeId: state.changeId + 1
      });

      break;
    default:
  }

  return routing(newState || state, { type, payload });
}
