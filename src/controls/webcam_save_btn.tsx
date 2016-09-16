import * as React from "react";
import { DeviceAccountSettings } from "../devices/interfaces";
import { put } from "axios";

interface Blah {
  dispatch: Function;
  apiUrl: string;
  webcam_url: string;
};

let saveWebcamUrl = ({dispatch, apiUrl, webcam_url}: Blah) => () => {
  return dispatch(function() {
    put<DeviceAccountSettings>(apiUrl + "/api/device", { webcam_url })
      .then(res => dispatch({ type: "REPLACE_DEVICE_ACCOUNT_INFO", payload: res.data }))
      .catch((payload) => dispatch({ type: "DEVICE_ACCOUNT_ERR", payload }));
  });
};

interface WebcamSaveBtnProps {
  dispatch: Function;
  webcamUrl: string;
  apiUrl: string;
  dirty: boolean;
}

export function WebcamSaveBtn({dispatch, webcamUrl, apiUrl, dirty}) {
  if (dirty) {
    return <button type="button"
                   className="green button-like widget-control"
                   onClick={
                     saveWebcamUrl({
                       dispatch,
                       apiUrl,
                       webcam_url: webcamUrl
                      })
                   }>
      SAVE
    </button>;

  } else {
    return <span></span>;
  };
}
