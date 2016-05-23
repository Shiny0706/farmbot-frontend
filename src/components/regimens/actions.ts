import { Regimen } from "./interfaces";
import { ReduxAction } from "../interfaces";

export function editRegimen(regimen: Regimen,
                            update: Object):
                            ReduxAction<{regimen: Regimen, update: Object}> {

  return {
    type: "EDIT_REGIMEN",
    payload: {
      regimen,
      update
    }
  };
}

export function saveRegimen(regimen: Regimen): ReduxAction<Regimen> {
  alert("Coming soon!");

  return {
    type: "SAVE_REGIMEN",
    payload: regimen
  };
}
