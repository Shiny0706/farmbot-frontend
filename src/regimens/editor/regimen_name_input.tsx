import * as React from "react";
import { editRegimen } from "../actions";
import { RegimenProps, Regimen } from "../interfaces";

function write({dispatch, regimen}: RegimenProps): Function {
  if (!regimen) {
    throw new Error("Regimen is required");
  }
  return (event) => {
    regimen = regimen as Regimen; // Almost certainly a bug in TS.
    let action = editRegimen(
      regimen, {
        name: event.target.value
      }
    );
    dispatch(action);
  };
}

export function RegimenNameInput({regimen, dispatch}: RegimenProps) {
  let value = (regimen && regimen.name) || "";
  return <input id="right-label"
    placeholder="Regimen Name"
    type="text"
    onChange={ write({ dispatch, regimen }) }
    value={ value }/>;
}
