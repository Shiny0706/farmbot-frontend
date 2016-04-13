import { error, success } from "../logger";
import * as $ from "jquery";
import * as _ from "lodash";

let action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  LOGIN_ERR: function(state, action) {
    error("Login failed.");
    unsetToken();
    return _.assign({},
                    state,
                    { token: "",
                      authenticated: false });
  },
  LOGIN_OK: function(state, action) {
    let token = action.payload.encoded;
    let info = action.payload.unencoded;
    // TODO : Move side effects into Thunk / Action creator.
    setToken(token);
    return _.assign({},
                    state,
                    { token },
                    {authenticated: true},
                    info);
  }
};

let initialState = {
  token: "---",
  authenticated: false
};

export function authReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
// TODO Side effects belong in action creators (thunks), not the dispatcher.
export function setToken(token) {
  // localStorage["farmbot_token"] = token || "";
  $.ajaxSetup({beforeSend: function (xhr) {
       xhr.setRequestHeader("Authorization", token);
    }
  });
}

// TODO Side effects belong in action creators (thunks), not the dispatcher.
function unsetToken() {
    // localStorage["farmbot_token"] = "";
    $.ajaxSetup({beforeSend: function (xhr) {
         xhr.setRequestHeader("Authorization", "");
      }
    });
}
