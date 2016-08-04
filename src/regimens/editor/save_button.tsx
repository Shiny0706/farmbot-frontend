import * as React from "react";
import { RegimenProps } from "../interfaces";
import { saveRegimen } from "../actions";

function save({regimen, dispatch}: RegimenProps) {
  return event => dispatch(saveRegimen(regimen));
}

export function SaveButton({regimen, dispatch}: RegimenProps) {
  if (!regimen) { return <span /> };
  return <button className="green button-like widget-control"
                 onClick={ save({dispatch, regimen}) }>
    Save { regimen.dirty ? "*" : "" }
  </button>;
}
