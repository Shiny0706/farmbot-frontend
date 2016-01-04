import { Device } from '../models/device';
import Farmbot from 'farmbot';
import { store } from '../store';
import { bot } from '../bot';
import { success, error } from '../logger';

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
  return dispatch => {
    return Device.save(deviceAttrs).then(
      (res) => dispatch(saveDeviceOk(res)),
      (err) => dispatch(saveDeviceErr(err)),
    );
  };
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
  bot.replace(
    Farmbot(
      Object.assign(
        {}, resp, {timeout: 2500}
        )
      )
    );
  return dispatch => {
    return bot.current.connect().then(
      (res) => dispatch(CONNECT_OK(resp)),
      (err) => dispatch(CONNECT_ERR(err)),
    );
  };
}

function CONNECT_OK(res) {
    function onChange(data){
      console.log("Change!", data)
      store.dispatch({ type: "BOT_CHANGE", payload: data });
    }
    bot.current.on("*", onChange);
   return {
    type: "CONNECT_OK",
    payload: res
   }
};

function CONNECT_ERR(err) {
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
