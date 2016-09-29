import * as React from "react";
import { RegimenProps } from "../interfaces";
import { deleteRegimen } from "../actions";
import { t } from "i18next";

function remove({regimen, dispatch, baseUrl}: DeleteButtonProps) {
  if (regimen) {
    return (event: React.FormEvent) => regimen && dispatch(deleteRegimen(regimen, baseUrl));
  } else {
    // Technically unreachable, but I'll keep TS happy...
    throw new Error("Tried to delete non-existant regimen");
  }
}

interface DeleteButtonProps extends RegimenProps {
  baseUrl: string;
};

export function DeleteButton({regimen, dispatch, baseUrl}: DeleteButtonProps) {
  if (!regimen) { return <span />; };
  return <button className="red button-like widget-control"
                 onClick={ remove({dispatch, regimen, baseUrl}) }>
          {t("Delete")}
        </button>;
}
