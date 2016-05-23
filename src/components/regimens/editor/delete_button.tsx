import * as React from "react";
import { RegimenProps } from "./index";
import { deleteRegimen } from "../actions";

function remove({regimen, dispatch}: RegimenProps) {
  return event => dispatch(deleteRegimen(regimen));
}

export function DeleteButton({regimen, dispatch}: RegimenProps) {
  return <button className="red button-like widget-control"
                 onClick={ remove({dispatch, regimen}) }>
          Delete
        </button>;
}
