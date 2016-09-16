import * as React from "react";
import { updateDevice } from "../devices/actions"
interface SaveWebcamParams {
  dispatch: Function;
  apiUrl: string;
  webcam_url: string;
};

let saveWebcamUrl = ({dispatch, apiUrl, webcam_url}: SaveWebcamParams) => () => {
  return dispatch((d) => updateDevice(apiUrl, { webcam_url }, d));
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
