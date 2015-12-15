const initialState = {};
import { error, warning } from '../logger';

var action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, action) {
    console.log("OK!!");
    return state;
  },
  FETCH_DEVICE_ERR: function(state, action) {
    if (action.payload.status === 404) {
      warning("<a href='/dashboard/devices'>You need to <u>add a device</u>"+
              " to your account!</a>",
              "No device found!");
    } else{
      error("Unable to download device data from server. Check your internet connection.")
    };
    return state;
  },
}

export function botReducer(state = initialState, action) {
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
