import * as React from "react";
import { updateDevice } from "../devices/actions";
import  * as i18next  from "i18next";
interface SaveWebcamParams {
  dispatch: Function;
  apiUrl: string;
  webcam_url: string;
};

let saveWebcamUrl = ({dispatch, apiUrl, webcam_url}: SaveWebcamParams) => () => {
  return dispatch( () => updateDevice(apiUrl, { webcam_url }, dispatch) );
};

interface WebcamSaveBtnProps {
  dispatch: Function;
  webcamUrl: string;
  apiUrl: string;
  dirty: boolean;
}

export function WebcamSaveBtn({dispatch, webcamUrl, apiUrl, dirty}:WebcamSaveBtnProps) {
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
      {i18next.t("SAVE")}
    </button>;

  } else {
    return <span></span>;
  };
}
