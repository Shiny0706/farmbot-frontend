import { Device } from '../models/device'

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
  return {
    type: "FETCH_DEVICE_OK",
    payload: resp
  }
}

function FETCH_DEVICE_ERR(err) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  }
}
