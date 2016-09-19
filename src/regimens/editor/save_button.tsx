import * as React from "react";
import { RegimenProps, Regimen } from "../interfaces";
import { saveRegimen } from "../actions";

interface SaveButtonProps extends RegimenProps {
  url: string;
  token: string;
};

function save({regimen, dispatch, url, token}: SaveButtonProps) {
  if (regimen) {
    return (event: React.FormEvent) => {
      regimen = regimen as Regimen; // TS BUG???
      dispatch(saveRegimen(regimen, url, token));
    };
  } else {
    throw new Error("Tried to save regimen, but there was no regimen.");
  };

}

export function SaveButton({regimen, dispatch, url, token}: SaveButtonProps) {
  if (regimen) {
    return <button className="green button-like widget-control"
      onClick={save({ dispatch, regimen, url, token })}>

      Save {regimen.dirty ? "*" : ""}
    </button>;
  } else {
    return <span />;
  };
}
