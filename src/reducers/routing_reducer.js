import { routeReducer as routing } from 'redux-simple-router';
var DEFAULT_WELCOME_PAGE = "/dashboard";
let initialState = {
  changeId: 1,
  path: undefined,
  state: undefined,
  replace: false
}

// I needed to sprinkle some extra magic ontop of redux-simple-router, so I
// wrapped the function.
export function routeReducer(state=initialState, { type, payload }) {
  var newState;
  switch(type) {
    case "LOGIN_OK":
      var newState = Object.assign({}, state, {
        attemptedURL: null,
        path: state.attemptedURL || DEFAULT_WELCOME_PAGE,
        changeId: state.changeId + 1,
        state: payload.state,
        replace: true //payload.replace
      })
      break;
    case "LOGIN_REQUIRED":

      var newState = Object.assign({}, state, {
        path: "/login",
        attemptedURL: payload.attemptedURL,
        changeId: state.changeId + 1
      });

      break;
    default:
  }

  return routing(newState || state, { type, payload });
}
