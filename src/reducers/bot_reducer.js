const initialState = {};
import { error, warning, success } from '../logger';

var action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, action) {
    return {
      ...state,
      ...action.payload
    };
  },
  FETCH_DEVICE_ERR: function(state, action) {
    if (action.payload.status === 404) {
      warning("<a href='/dashboard/devices'>You need to <u>add a device</u>"+
              " to your account.</a>",
              "No device found!");
    } else{
      error("Unable to download device data from server. " +
            "Check your internet connection.");
    };
    return state;
  },
  SAVE_DEVICE_ERR: function(state, action) {
    switch(action.payload.status) {
      case 422:
        var errors = _.map(action.payload.responseJSON, v => v ).join(". ");
        error(errors, "Couldn't save device.");
        break;
      default:
        error("Error while saving device.");
        break;
    }
    return state;
  },
  SAVE_DEVICE_OK: function(state, action) {
    success("Device saved.")
    return state;
  }
}

export function botReducer(state = initialState, action) {
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
