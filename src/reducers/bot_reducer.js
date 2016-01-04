import { error, warning, success } from '../logger';
import { bot } from '../bot';

var status = {
  NOT_READY: "never connected to device",
  CONNECTING: "initiating connection",
  AWAITING_API: "downloading device credentials",
  API_ERROR: "Unable to download device credentials",
  AWAITING_WEBSOCKET: "calling FarmBot with credentials",
  WEBSOCKET_ERR: "Error establishing socket connection",
  CONNECTED: "Socket Connection Established"
}

var initialState = {
  status: status.NOT_READY
}


var action_handlers = {

  READ_STATUS_OK: function(state, action) {
    console.log("!!!");
    return {
      ...state,
      ...action.payload
    }
  },

  BOT_CHANGE: function(state, action) {
    console.log("CHANGE EVENT FIRED");
    return state;
  },

  DEFAULT: function(state, action) {
    return state;
  },

  COMMAND_ERR: function(s, a) {
    return s;
  },

  COMMAND_OK: function(s, a) {
    return s;
  },

  CONNECT_OK: function(state, action) {
    return {
      ...state,
      ...action.payload,
      status: status.CONNECTED,
      connected: true
    };
  },

  CONNECT_ERR: function(state, action) {
    return {
      ...state,
      status: status.WEBSOCKET_ERR
    };
  },
  CHANGE_DEVICE: function(state, action) {
    return {
      ...state,
      ...action.payload
    };
  },

  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, {action, payload}) {
    return {
      ...state,
      ...payload,
      status: status.AWAITING_WEBSOCKET
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
    return {
      ...state,
      status: status.API_ERROR
    };
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

export function botReducer(state = initialState, action) {
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  var newState = Object.assign({}, handler(state, action));
  if (!action.type[0] === "@") {
    console.log(action.type, state)
  } else{
    console.log(action.type, state)
  };
  return newState;
}
