import { error, warning, success } from "../../logger";
import * as _ from "lodash";
import { BotState } from "./interfaces";

let status = {
  NOT_READY: "never connected to device",
  CONNECTING: "initiating connection",
  AWAITING_API: "downloading device credentials",
  API_ERROR: "Unable to download device credentials",
  AWAITING_WEBSOCKET: "calling FarmBot with credentials",
  WEBSOCKET_ERR: "Error establishing socket connection",
  CONNECTED: "Socket Connection Established",
  READY: "Bot ready"
};

let initialState: BotState = {
  status: status.NOT_READY,
  stepSize: 1000,
  hardware: {},
  axisBuffer: {},
  settingsBuffer: {}
};
interface ActionHandlerDictionary {
  [name: string]: (state: BotState, action: any) => BotState;
}
let action_handlers: ActionHandlerDictionary = {
  SETTING_TOGGLE_OK: function(state, action) {
    return this.READ_STATUS_OK(state, action);
  },

  COMMIT_SETTINGS_OK: function(state, action) {
    let nextState = _.assign<any, BotState>({}, state, {
      settingsBuffer: {}
    });
    return nextState;
  },

  COMMIT_AXIS_CHANGE_OK: function(oldState, action) {
    let hardware = _.assign({}, oldState.hardware, action.payload);
    let state = _.assign<any, BotState>({}, oldState);

    return _.assign<any, BotState>({}, state, {
      axisBuffer: {},
      hardware
    });
  },

  COMMIT_AXIS_CHANGE_ERR: function(state, action) {
    return state;
  },

  CHANGE_AXIS_BUFFER: function(state, action) {
    let axisBuffer = _.assign({}, state.axisBuffer);
    axisBuffer[action.payload.key] = action.payload.val;

    return _.assign<any, BotState>({}, state, {
      axisBuffer: axisBuffer
    });
  },

  CHANGE_SETTINGS_BUFFER: function(state, action) {
    let settingsBuffer = _.assign({}, state.settingsBuffer);
    let newVal = Number(action.payload.val);
    if (newVal) {
      settingsBuffer[action.payload.key] = action.payload.val;
    } else {
      delete settingsBuffer[action.payload.key];
    }
    return _.assign<any, BotState>({}, state, {
      settingsBuffer: settingsBuffer
    });
  },

  CHANGE_STEP_SIZE: function(state, action) {
    return _.assign<any, BotState>({}, state, {
      stepSize: action.payload
    });
  },

  READ_STATUS_OK: function(state, action) {
    let hardware: any = _.assign({}, action.payload);
    delete hardware.method;
    return _.assign<any, BotState>({},
      state, {
        hardware: hardware
      }, {
        status: status.READY
      });
  },

  BOT_CHANGE: function(state, action) {
    let statuses: any = _.assign({}, action.payload);
    let newState: any = _.assign({}, state);
    newState.hardware = _.assign({}, state.hardware, statuses);
    return _.assign<any, BotState>({}, newState);
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
    return _.assign<any, BotState>({},
      state,
      action.payload, {
        status: status.CONNECTED,
        connected: true
      });
  },

  CONNECT_ERR: function(state, action) {
    return _.assign<any, BotState>({},
      state, {
        status: status.WEBSOCKET_ERR
      });
  },
  CHANGE_DEVICE: function(state, action) {
    return _.assign<any, BotState>({},
      state,
      action.payload);
  },

  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, { payload }) {
    return _.assign<any, BotState>({},
      state,
      payload, {
        status: status.AWAITING_WEBSOCKET
      });
  },
  FETCH_DEVICE_ERR: function(state, action) {
    if (action.payload.status === 404) {
      warning("You need to add a device to your account.",
        "No device found!");
    } else {
      error("Unable to download device data from server. " +
        "Check your internet connection.");
    };
    return _.assign<any, BotState>({},
      state, {
        status: status.API_ERROR
      });
  },
  SAVE_DEVICE_ERR: function(state, action) {
    switch (action.payload.status) {
      case 422:
        let errors = _.map(action.payload.responseJSON, v => v)
          .join(". ");
        error(errors, "Couldn\'t save device.");
        break;
      default:
        error("Error while saving device.");
        break;
    }
    return state;
  },
  SAVE_DEVICE_OK: function(state, action) {
    // TODO Move this into the action creator. Does not belong in a reducer.
    success("Device saved.");
    return _.assign<any, BotState>({}, state, action.payload, {
      dirty: false
    });
  },
  BOT_NOTIFICATION: function(state, action) {
    let nextState = _.cloneDeep(state);
    let newStatus = _.cloneDeep(action.payload);
    _.assign<any, BotState>(nextState.hardware, newStatus);
    return nextState;
  }
};

export function botReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers["DEFAULT"]);
  let result = handler.call(action_handlers, state, action);
  let newState = _.assign({}, result);
  return newState;
}
