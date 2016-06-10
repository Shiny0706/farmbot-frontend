import { error, warning, success } from "../../logger";
import * as _ from "lodash";
import { BotState } from "./interfaces";
import { generateReducer } from "../generate_reducer";

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
  logQueueSize: 10,
  logQueue: [],
  status: status.NOT_READY,
  stepSize: 1000,
  hardware: {},
  axisBuffer: {},
  settingsBuffer: {}
};

export let botReducer = generateReducer<BotState>(initialState)
  .add<any>(function SETTING_TOGGLE_OK(state, action) {
    return this.READ_STATUS_OK(state, action);
  })
  .add<any>(function COMMIT_SETTINGS_OK(state, action) {
    let nextState = _.assign<any, BotState>({}, state, {
      settingsBuffer: {}
    });
    return nextState;
  })
  .add<any>(function COMMIT_AXIS_CHANGE_OK(oldState, action) {
    let hardware = _.assign({}, oldState.hardware, action.payload);
    let state = _.assign<any, BotState>({}, oldState);

    return _.assign<any, BotState>({}, state, {
      axisBuffer: {},
      hardware
    });
  })
  .add<any>(function COMMIT_AXIS_CHANGE_ERR(state, action) {
    return state;
  })
  .add<any>(function CHANGE_AXIS_BUFFER(state, action) {
    let axisBuffer = _.assign({}, state.axisBuffer);
    axisBuffer[action.payload.key] = action.payload.val;

    return _.assign<any, BotState>({}, state, {
      axisBuffer: axisBuffer
    });
  })
  .add<any>(function CHANGE_SETTINGS_BUFFER(state, action) {
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
  })
  .add<any>(function CHANGE_STEP_SIZE(state, action) {
    return _.assign<any, BotState>({}, state, {
      stepSize: action.payload
    });
  })
  .add<any>(function READ_STATUS_OK(state, action) {
    let hardware: any = _.assign({}, action.payload);
    delete hardware.method;
    return _.assign<any, BotState>({},
      state, {
        hardware: hardware
      }, {
        status: status.READY
      });
  })
  .add<any>(function BOT_CHANGE(state, action) {
    let statuses: any = _.assign({}, action.payload);
    let newState: any = _.assign({}, state);
    newState.hardware = _.assign({}, state.hardware, statuses);
    return _.assign<any, BotState>({}, newState);
  })
  .add<any>(function COMMAND_ERR(s, a) {
    return s;
  })
  .add<any>(function COMMAND_OK(s, a) {
    return s;
  })
  .add<any>(function CONNECT_OK(state, action) {
    return _.assign<any, BotState>({},
      state,
      action.payload, {
        status: status.CONNECTED,
        connected: true
      });
  })
  .add<any>(function CONNECT_ERR(state, action) {
    return _.assign<any, BotState>({},
      state, {
        status: status.WEBSOCKET_ERR
      });
  })
  .add<any>(function CHANGE_DEVICE(state, action) {
    return _.assign<any, BotState>({},
      state,
      action.payload);
  })
  .add<any>(function FETCH_DEVICE(state, action) {
    return state;
  })
  .add<any>(function FETCH_DEVICE_OK(state, { payload }) {
    return _.assign<any, BotState>({},
      state,
      payload, {
        status: status.AWAITING_WEBSOCKET
      });
  })
  .add<any>(function FETCH_DEVICE_ERR(state, action) {
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
  })
  .add<any>(function SAVE_DEVICE_ERR(state, action) {
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
  })
  .add<any>(function SAVE_DEVICE_OK(state, action) {
    // TODO Move this into the action creator. Does not belong in a reducer.
    success("Device saved.");
    return _.assign<any, BotState>({}, state, action.payload, {
      dirty: false
    });
  })
  .add<any>(function BOT_LOG_MESSAGE(s, { payload }) {
    let state = _.cloneDeep(s);
    let msg = _.cloneDeep(payload);

    state.logQueue.unshift(msg);
    state.logQueue = _.take(state.logQueue, state.logQueueSize);

    return state;
  });
