import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { warning } from "../../logger";

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
  warning("Coming soon!");

  return {
    type: "SAVE_REGIMEN",
    payload: regimen
  };
}

export function deleteRegimen(regimen: Regimen): ReduxAction<Regimen> {
  warning("Coming soon!");

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

export function removeRegimenItem(item: RegimenItem): ReduxAction<RegimenItem> {
  return {
    type: "REMOVE_REGIMEN_ITEM",
    payload: item
  };
}
