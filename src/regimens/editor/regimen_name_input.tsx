import * as React from "react";
import { editRegimen } from "../actions";
import { RegimenProps, Regimen } from "../interfaces";
import { t } from "i18next";
import { ColorPicker } from "../../sequences/color_picker";
import { Color } from "../../interfaces";

function write({dispatch, regimen}: RegimenProps): React.EventHandler<React.FormEvent> {
  if (!regimen) {
    throw new Error("Regimen is required");
  }
  return (event: React.FormEvent) => {
    regimen = regimen as Regimen; // Almost certainly a bug in TS.
    let action = editRegimen(
      regimen, {
        name: (event.target as HTMLInputElement).value
      }
    );
    dispatch(action);
  };
}

function updateColor({dispatch, regimen}: RegimenProps) {
  if (!regimen) {
    throw new Error("Regimen is required");
  } else {
    return (function colorUpdater(color: Color) {
      dispatch(editRegimen(regimen, { color }));
    });
  }
};
export function RegimenNameInput({regimen, dispatch}: RegimenProps) {
  let value = (regimen && regimen.name) || "";
  // return <input id="right-label"
  //   placeholder= {t("Regimen Name")}
  //   type="text"
  //   onChange={ write({ dispatch, regimen }) }
  //   value={ value }/>;
  return (<div className="row">
    <div className="col-sm-10">
      <input id="right-label"
        placeholder={t("Regimen Name")}
        type="text"
        onChange={write({ dispatch, regimen })}
        value={value} />
    </div>
    <div className="col-sm-1">
      <ColorPicker current={(regimen && regimen.color) || "gray"}
        onChange={updateColor({ dispatch, regimen })} />
    </div>
    <div className="col-sm-1" />
  </div>);
}
