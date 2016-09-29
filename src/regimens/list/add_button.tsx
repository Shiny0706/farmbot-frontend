import * as React from "react";
import { newRegimen } from "../actions";
import { t } from "i18next";

interface AddRegimenProps {
  dispatch: Function;
}

export function AddRegimen({dispatch}: AddRegimenProps) {
  return <button className="green button-like widget-control"
                 onClick={ add(dispatch) }>
    {t("Add")}
  </button>;
}

function add(dispatch: Function) {
  return (event: React.FormEvent) => dispatch(newRegimen());
}
