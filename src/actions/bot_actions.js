import { Device } from '../models/device';
import Farmbot from 'farmbot';
import { store } from '../store';
import { bot } from '../bot';
import { success, error } from '../logger';

export function CHANGE_DEVICE(attributesThatWillChange = {}) {
  attributesThatWillChange.dirty = true;
  return {
    type: "CHANGE_DEVICE",
    payload: attributesThatWillChange
  }
}

export function fetchDevice() {
  if (!bot.current.offline()) {
    return {type: "FETCH_DEVICE", payload: {}};
  } else{
    return function(dispatch) {
      return Device.fetch().then(
        function(res){ dispatch(FETCH_DEVICE_OK(res)) },
        function(err){ dispatch(FETCH_DEVICE_ERR(err)) });
    }
  };
};

export function sendCommand(payload) {
  if (!bot.current.offline()) {
    var method = bot.current[payload.name];
    var result = method.call(bot.current, payload);
    return function(dispatch) {
      return result.then(
        function (res) {
          success((payload.name || "Command") + " request received.","Farmbot Heard You!")
          dispatch({type: "COMMAND_OK", payload: res });
        }, function(e) {
          error((payload.name || "Command") + " request failed.","Farmbot Didn't Get That!")
          dispatch({type: "COMMAND_ERR", payload: e });
        })
    };
  } else {
    return fetchDevice();
  }
}

export function addDevice(deviceAttrs) {
  return dispatch => {
    return Device.save(deviceAttrs).then(
      (res) => dispatch(SAVE_DEVICE_OK(res)),
      (err) => dispatch(SAVE_DEVICE_ERR(err)),
    );
  };
}

function SAVE_DEVICE_OK(resp) {
  return {
    type: "SAVE_DEVICE_OK",
    payload: resp.data
  }
}

function SAVE_DEVICE_ERR(err) {
  return {
    type: "SAVE_DEVICE_ERR",
    payload: err
  }
}

function FETCH_DEVICE_OK(resp) {
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

function FETCH_DEVICE_ERR(err) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  }
}
