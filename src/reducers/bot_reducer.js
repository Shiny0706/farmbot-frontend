import { error, warning, success } from '../logger';

var action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  CHANGE_DEVICE: function(state, action) {
    return {
      ...state,
      ...action.payload
    };
  },
  FETCH_DEVICE: function(state, action) {
    return {
      ...state
    };
  },
  FETCH_DEVICE_OK: function(state, {action, payload}) {
    return {
      ...state,
      ...payload
    };
  },
  FETCH_DEVICE_ERR: function(state, action) {
    if (action.payload.status === 404) {
      warning("You need to add a device to your account.",
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
    return {
      ...state,
      ...action.payload,
      dirty: false
    };
  }
}

export function botReducer(state, action) {
  var state = Object.assign({}, state);
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  var newState = Object.assign({}, handler(state, action));
  console.log(action.type, newState)
  return newState;
}
