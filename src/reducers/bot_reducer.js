import { error, warning, success } from '../logger';
import { bot } from '../bot';

var status = {
  NOT_READY: "never connected to device",
  CONNECTING: "initiating connection",
  AWAITING_API: "downloading device credentials",
  API_ERROR: "Unable to download device credentials",
  AWAITING_WEBSOCKET: "calling FarmBot with credentials",
  WEBSOCKET_ERR: "Error establishing socket connection",
  CONNECTED: "Socket Connection Established",
  READY: "Bot ready"
}

var initialState = {
  status: status.NOT_READY,
  axisBuffer: {},
  settingsBuffer: {},
  stepSize: 1000,
  hardware: {}
}


var action_handlers = {
  COMMIT_SETTINGS_OK: function(state, action) {
    return {
      ...state,
      settingsBuffer: {}
    }
  },
  COMMIT_AXIS_CHANGE_OK: function(state, action) {
    // READ_STATUS_OK + reset axisBuffer. That's it.
    var state = this.READ_STATUS_OK(state, action) // Dat reuse, tho.
    return {
      ...state,
      axisBuffer: {}
    }
  },

  COMMIT_AXIS_CHANGE_ERR: function(state, action) {
    return state;
  },

  CHANGE_AXIS_BUFFER: function(state, action) {
    var axisBuffer = Object.assign({}, state.axisBuffer);
    axisBuffer[action.payload.key] = action.payload.val;

    return {
      ...state,
      ...{ axisBuffer }
    }
  },

  CHANGE_SETTINGS_BUFFER: function(state, action) {
    var settingsBuffer = Object.assign({}, state.settingsBuffer);
    var newVal = Number(action.payload.val);
    if(newVal) {
      settingsBuffer[action.payload.key] = action.payload.val;
    } else {
      delete settingsBuffer[action.payload.key]
    }
    return {
      ...state,
      ...{ settingsBuffer }
    }
  },

  CHANGE_STEP_SIZE: function(state, action) {
  return {
      ...state,
      stepSize: action.payload
    };
  },

  READ_STATUS_OK: function(state, action) {
    var hardware = Object.assign({}, action.payload);
    delete hardware.method
    return {
      ...state,
      ...{ hardware },
      status: status.READY
    }
  },

  BOT_CHANGE: function(state, action) {
    console.log("CHANGE EVENT FIRED");
    var statuses = Object.assign({}, action.payload.result);
    delete statuses.name;
    delete statuses.method;
    var newState = {
      ...state
    };
    newState.hardware = {
      ...state.hardware,
      ...statuses
    }
    return newState;
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
  var result = handler.call(action_handlers, state, action);
  var newState = Object.assign({}, result);
  if (!action.type[0] === "@") {
    console.log(action.type, state)
  } else{
    console.log(action.type, state)
  };
  return newState;
}
