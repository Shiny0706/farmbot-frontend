import { Device } from '../models/device';
import { getBot } from '../bot_rpc';
import Farmbot from 'farmbot';

function NullBot() {
}

export var bot = new NullBot();

export function CHANGE_DEVICE(attributesThatWillChange = {}) {
  attributesThatWillChange.dirty = true;
  return {
    type: "CHANGE_DEVICE",
    payload: attributesThatWillChange
  }
}

export function fetchDevice() {
  return dispatch => {
    return Device.fetch().then(
      (res) => dispatch(FETCH_DEVICE_OK(res)),
      (err) => dispatch(FETCH_DEVICE_ERR(err))
    );
  };
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
  bot = Farmbot(resp);
  return dispatch => {
    return bot.connect().then(
      (res) => dispatch(CONNECT_OK(resp)),
      (err) => dispatch(CONNECT_ERR(err)),
    );
  };
}

function CONNECT_OK(res) {
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
