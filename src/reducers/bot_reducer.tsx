import { error, warning, success } from '../logger';
import { bot } from '../bot';
import * as _ from 'lodash';

let status = {
  NOT_READY: "never connected to device",
  CONNECTING: "initiating connection",
  AWAITING_API: "downloading device credentials",
  API_ERROR: "Unable to download device credentials",
  AWAITING_WEBSOCKET: "calling FarmBot with credentials",
  WEBSOCKET_ERR: "Error establishing socket connection",
  CONNECTED: "Socket Connection Established",
  READY: "Bot ready"
}

let initialState = {
  status: status.NOT_READY,
  axisBuffer: {},
  settingsBuffer: {},
  stepSize: 1000,
  hardware: {}
}

let action_handlers = {
  SETTING_TOGGLE_OK: function(state, action) {
    return this.READ_STATUS_OK(state, action);
  },

  COMMIT_SETTINGS_OK: function(state, action) {
    return _.assign({}, state, {
      settingsBuffer: {}
    });
  },

  COMMIT_AXIS_CHANGE_OK: function(state, action) {
    // READ_STATUS_OK + reset axisBuffer. That's it.
    let state = this.READ_STATUS_OK(state, action) // Dat reuse, tho.
    return _.assign({}, state, {
      axisBuffer: {}
    });
  },

  COMMIT_AXIS_CHANGE_ERR: function(state, action) {
    return state;
  },

  CHANGE_AXIS_BUFFER: function(state, action) {
    let axisBuffer = Object.assign({}, state.axisBuffer);
    axisBuffer[action.payload.key] = action.payload.val;

    return _.assign({}, state, {
      axisBuffer: axisBuffer
    });
  },

  CHANGE_SETTINGS_BUFFER: function(state, action) {
    let settingsBuffer = Object.assign({}, state.settingsBuffer);
    let newVal = Number(action.payload.val);
    if(newVal) {
      settingsBuffer[action.payload.key] = action.payload.val;
    } else {
      delete settingsBuffer[action.payload.key]
    }
    return _.assign({}, state, {
      settingsBuffer: settingsBuffer
    });
  },

  CHANGE_STEP_SIZE: function(state, action) {
    return _.assign({}, state, {
      stepSize: action.payload
    });
  },

  READ_STATUS_OK: function(state, action) {
    let hardware = Object.assign({}, action.payload);
    delete hardware.method
    return _.assign({},
      state, {
        hardware: hardware
      }, {
        status: status.READY
      });
  },

  BOT_CHANGE: function(state, action) {
    let statuses = Object.assign({}, action.payload.result);
    delete statuses.name;
    delete statuses.method;
    let newState = _.assign({}, state);
    newState.hardware = _.assign({}, state.hardware, statuses);

    return _.assign({}, newState);
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
    return _.assign({},
      state,
      action.payload, {
        status: status.CONNECTED,
        connected: true
      });
  },

  CONNECT_ERR: function(state, action) {
    return _.assign({},
      state, {
        status: status.WEBSOCKET_ERR
      });
  },
  CHANGE_DEVICE: function(state, action) {
    return _.assign({},
      state,
      action.payload);
  },

  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, {
    action,
    payload
  }) {
    return _.assign({},
      state,
      payload, {
        status: status.AWAITING_WEBSOCKET
      });
  },
  FETCH_DEVICE_ERR: function(state, action) {
    if(action.payload.status === 404) {
      warning("You need to add a device to your account.",
        "No device found!");
    } else {
      error("Unable to download device data from server. " +
        "Check your internet connection.");
    };
    return _.assign({},
      state, {
        status: status.API_ERROR
      });
  },
  SAVE_DEVICE_ERR: function(state, action) {
    switch(action.payload.status) {
      case 422:
        let errors = _.map(action.payload.responseJSON, v => v)
          .join(". ");
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
    return _.assign({}, state, action.payload, {
      dirty: false
    });
  }
}

export function botReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  if(!handler) {
    debugger;
  };
  let result = handler.call(action_handlers, state, action);
  let newState = Object.assign({}, result);
  if(action.type[0] !== "@") {
    console.log(action.type, state)
  };
  return newState;
}
