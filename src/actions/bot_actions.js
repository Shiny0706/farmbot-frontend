import { Device } from '../models/device';
import { Farmbot } from 'farmbot';
import { store } from '../store';
import { bot } from '../bot';
import { success, error } from '../logger';

const ON = 1, OFF = 0, DIGITAL = 0;

export function settingToggle(name, bot) {
  return function(dispatch) {
    var currentValue = bot.hardware[name];
    var packet = {
      name: (currentValue === 0) ? ON : OFF
    };
    var promise = bot.updateCalibration(packet)
    return promise.then(res => dispatch(settingToggleOk(res)),
                 err => dispatch(settingToggleErr(err)))
  }
}

export function settingToggleOk(res) {
  return {
    type: "SETTING_TOGGLE_OK",
    payload: res.result
  }
}

export function settingToggleErr(err) {
  error("Refresh browser or restart bot.", "Error while toggling setting");
  return {
    type: "SETTING_TOGGLE_ERR",
    payload: {}
  }
}


export function pinToggle(num) {
  var currentValue = store.getState().bot.hardware[`pin${num}`];
  var newPinValue = (currentValue === "on") ? OFF : ON;
  var promise = bot
    .current
    .pinWrite({pin: num, value1: newPinValue, mode: DIGITAL});
  return function(dispatch) {
    promise.then(res => dispatch(pinToggleOk(res)),
                 err => dispatch(pinToggleErr(err)))
  }
}

export function pinToggleOk(res) {
  return {
    type: "PIN_TOGGLE_OK",
    payload: res.result
  }
}

export function pinToggleErr(err) {
  error("Refresh browser or restart bot.", "Error while toggling pin");
  return {
    type: "PIN_TOGGLE_ERR",
    payload: {}
  }
}

export function changeStepSize(integer) {
  return {
    type: "CHANGE_STEP_SIZE",
    payload: integer
  }
}

export function changeAxisBuffer(key, val) {
  return {
    type: "CHANGE_AXIS_BUFFER",
    payload: { key, val }
  }
}

export function changeSettingsBuffer(key, val) {
  return {
    type: "CHANGE_SETTINGS_BUFFER",
    payload: { key, val }
  }
}

export function commitSettingsChanges() {
  var { settingsBuffer, hardware } = store.getState().bot;
  var packet = _({})
                 .assign(hardware)
                 .assign(settingsBuffer)
                 .value()
  var promise = bot.current.updateCalibration(packet);
  return function(dispatch) {
    return promise.then(
      (resp) => dispatch(commitSettingsChangesOk(resp)),
      (err)  => dispatch(commitSettingsChangesErr(err)))
    }
  }

function commitSettingsChangesOk(resp) {
  return {
    type: "COMMIT_SETTINGS_OK",
    payload: {}
  }
}

function commitSettingsChangesErr(err) {
  return {
    type: "COMMIT_SETTINGS_ERR",
    payload: {

    }
  }
}

export function commitAxisChanges() {
  var {axisBuffer, hardware} = store.getState().bot;
  var packet = _({})
                 .assign(hardware)
                 .assign(axisBuffer)
                 .assign({speed: hardware.s})
                 .pick("x", "y", "z", "speed")
                 .transform((a, b, c) => a[c] = Number(b) , {})
                 .value()
  var promise = bot.current.moveAbsolute(packet);
  return function(dispatch) {
    return promise.then(
      (resp) => dispatch(commitAxisChangesOk(resp)),
      (err)  => dispatch(commitAxisChangesErr(resp)))
    }
  }

function commitAxisChangesErr(err) {
  return {
    type: "COMMIT_AXIS_CHANGE_ERR",
    payload: err
  }
}

function commitAxisChangesOk(resp) {
  return {
    type: "COMMIT_AXIS_CHANGE_OK",
    payload: resp.result
  }
}

export function readStatus() {
  var promise = bot.current.readStatus();
  return function(dispatch) {
    return promise.then(function(resp){
      dispatch(readStatusOk(resp));
    }, readStatusErr)
  }
}

function readStatusOk(status){
  return {
    type: "READ_STATUS_OK",
    payload: status.result
  }
}

function readStatusErr(msg) {
  error("Attempted to read status, but failed. See logs for details.",
        "Read Status Error");
  console.warn("READSTATUSERR", msg);
}

export function changeDevice(attributesThatWillChange = {}) {
  attributesThatWillChange.dirty = true;
  return {
    type: "CHANGE_DEVICE",
    payload: attributesThatWillChange
  }
}

export function fetchDevice() {
  if (!bot.current.offline()) {
    // Do nothing if its already online.
    return {type: "FETCH_DEVICE", payload: {}};
  } else{
    return function(dispatch) {
      return Device.fetch().then(
        function(res){ dispatch(fetchDeviceOk(res)) },
        function(err){ dispatch(fetchDeviceErr(err)) });
    }
  };
};

export function sendCommand(payload) {
  if (!bot.current.offline()) {
    var method = bot.current[payload.name];
    var result = method.call(bot.current, payload);
    return (dispatch) => {
      return result.then(
        (res) => sendCommandOk(res, payload, dispatch),
        (e) => sendCommandErr(e, payload, dispatch))
    };
  } else {
    return fetchDevice();
  }
}

function sendCommandOk(res, payload, dispatch) {
  dispatch({type: "COMMAND_OK", payload: res });
}

function sendCommandErr(e, payload, dispatch) {
  var msg = (payload.name || "Command") + " request failed.";
  error(msg, "Farmbot Didn't Get That!");
  dispatch({type: "COMMAND_ERR", payload: e });
}

export function addDevice(deviceAttrs) {

  return (dispatch) => {
    Device
      .save(deviceAttrs)
      .then(function(res) { dispatch(saveDeviceOk(res)) },
            function(err) { dispatch(saveDeviceErr(err)) })
  }
}

function saveDeviceOk(resp) {
  return {
    type: "SAVE_DEVICE_OK",
    payload: resp.data
  }
}

function saveDeviceErr(err) {
  return {
    type: "SAVE_DEVICE_ERR",
    payload: err
  }
}

function fetchDeviceOk(resp) {
  let token = store.getState().auth.token
  let config = Object.assign({}, resp, {timeout: 7000, token: token});
  try {
    console.log(`Logining in to ${JSON.parse(atob(token.split('.')[1])).iss}`)
  } catch (e) { };
  let newBot = Farmbot(config);
  bot.replace(newBot); // <= I hate everything about this and need to remove it.
  return dispatch => {
    return bot
      .current
      .connect()
      .then(function(res) { dispatch(connectOk(resp)) },
            function(err) { dispatch(connectErr(err)) });
  };
}

function onChange(data) {
  data = (data || {});

  function isResponse(data) {
    store.dispatch({
      type: "BOT_CHANGE",
      payload: data
    });
  }

  function isBroadcast(data) {
    store.dispatch({
      type: "BOT_CHANGE",
      payload: (data.payload || data)
    });
  }

  return data.result ? isResponse(data) : isBroadcast(data);
}

function connectOk(res) {
  bot.current.on("*", onChange);

  return function(dispatch) {
    return Promise.resolve().then( function() {
      dispatch(readStatus());
      dispatch({ type: "CONNECT_OK", payload: res });
    })
  }
};

function connectErr(err) {
  return {
    type: "CONNECT_OK",
    payload: {}
  }
};

function fetchDeviceErr(err) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  }
}
