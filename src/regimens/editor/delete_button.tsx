import * as React from "react";
import { RegimenProps } from "../interfaces";
import { deleteRegimen } from "../actions";

function remove({regimen, dispatch, baseUrl, token}: DeleteButtonProps) {
  if (regimen) {
    return event => regimen && dispatch(deleteRegimen(regimen, baseUrl));
  } else {
    // Technically unreachable, but I'll keep TS happy...
    throw new Error("Tried to delete non-existant regimen");
  }
}

interface DeleteButtonProps extends RegimenProps {
  baseUrl: string;
  token: string;
};

export function DeleteButton({regimen, dispatch, baseUrl, token}: DeleteButtonProps) {
  if (!regimen) { return <span />; };
  return <button className="red button-like widget-control"
                 onClick={ remove({dispatch, regimen, baseUrl, token}) }>
          Delete
        </button>;
}
