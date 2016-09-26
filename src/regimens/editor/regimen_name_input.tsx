import * as React from "react";
import { editRegimen } from "../actions";
import { RegimenProps, Regimen } from "../interfaces";
import * as i18next from "i18next";

function write({dispatch, regimen}: RegimenProps): React.EventHandler<React.FormEvent> {
  if (!regimen) {
    throw new Error("Regimen is required");
  }
  return (event: React.FormEvent) => {
    regimen = regimen as Regimen; // Almost certainly a bug in TS.
    let action = editRegimen(
      regimen, {
        name: (event.target as any)["value"]
      }
    );
    dispatch(action);
  };
}

export function RegimenNameInput({regimen, dispatch}: RegimenProps) {
  let value = (regimen && regimen.name) || "";
  return <input id="right-label"
    placeholder= {i18next.t("Regimen Name")}
    type="text"
    onChange={ write({ dispatch, regimen }) }
    value={ value }/>;
}
