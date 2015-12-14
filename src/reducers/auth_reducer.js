import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from '../actions/auth_actions';

var token = localStorage["FB_TOKEN_STORE"];

var initialState = {
    token: token,
    authenticated: !!token
  }
import $ from 'jquery';
// This is bad!
$.ajaxSetup({beforeSend: function (xhr) {
           xhr.setRequestHeader("Authorization", token);
        }
      });

export function authReducer(state = initialState, action) {

  if ((action.type === AUTH_LOGIN)
      && action.sequence && action.sequence.type === 'complete') {
    localStorage["FB_TOKEN_STORE"] = action.payload.token;
    return {
      ...state,
      token: action.payload.token,
      authenticated: true,
    };
  } else if (action.type === AUTH_LOGOUT) {
    return initialState;
  }

  return state;
}
