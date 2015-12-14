import { Device } from '../models/device'

export function fetchDevice() {
  return dispatch => {
    return Device.fetch().then(
      (res) => dispatch(FETCH_DEVICE_OK(res)),
      (err) => dispatch(FETCH_DEVICE_ERR(err))
    );
  };
}

export function FETCH_DEVICE_OK(resp) {
  return {
    type: "FETCH_DEVICE_OK",
    payload: resp.data
  }
}

export function FETCH_DEVICE_ERR(err) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  }
}
