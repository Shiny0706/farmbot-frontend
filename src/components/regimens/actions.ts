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

export function deleteRegimen(regimen: Regimen): ReduxAction<Regimen> {
  alert("Coming soon!");

  return {
    type: "DELETE_REGIMEN",
    payload: regimen
  };
}

export function newRegimen(): ReduxAction<any> {
  return {
    type: "NEW_REGIMEN",
    payload: {}
  };
}

export function selectRegimen(index: number): ReduxAction<any> {
  return {
    type: "SELECT_REGIMEN",
    payload: index
  };
}
