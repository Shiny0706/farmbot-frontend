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
    setToken(action.payload.token);
    return _.assign({},
                    state,
                    {
                      token: action.payload.token,
                      authenticated: true,
                    });
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

export function setToken(token) {
  // localStorage["farmbot_token"] = token || "";
  $.ajaxSetup({beforeSend: function (xhr) {
       xhr.setRequestHeader("Authorization", token);
    }
  });
}

function unsetToken() {
    // localStorage["farmbot_token"] = "";
    $.ajaxSetup({beforeSend: function (xhr) {
         xhr.setRequestHeader("Authorization", "");
      }
    });
}
