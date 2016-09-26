import * as React from "react";
import { RegimenProps, Regimen } from "../interfaces";
import { saveRegimen } from "../actions";
import * as i18next from "i18next";

interface SaveButtonProps extends RegimenProps {
  url: string;
};

function save({regimen, dispatch, url}: SaveButtonProps) {
  if (regimen) {
    return (event: React.FormEvent) => {
      regimen = regimen as Regimen; // TS BUG???
      dispatch(saveRegimen(regimen, url));
    };
  } else {
    throw new Error("Tried to save regimen, but there was no regimen.");
  };

}

export function SaveButton({regimen, dispatch, url}: SaveButtonProps) {
  if (regimen) {
    return <button className="green button-like widget-control"
      onClick={save({ dispatch, regimen, url })}>

      { i18next.t("Save") + (regimen.dirty ? "*" : "") }
    </button>;
  } else {
    return <span />;
  };
}
