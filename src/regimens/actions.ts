import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { warning } from "../logger";
import { authHeaders } from "../auth/util";
import { post } from "axios";

const REGIMEN_URL = "api/regimens";

export function editRegimen(regimen: Regimen,
  update: Object):
  ReduxAction<{ regimen: Regimen, update: Object }> {

  return {
    type: "EDIT_REGIMEN",
    payload: {
      regimen,
      update
    }
  };
}

export function saveRegimen(regimen: Regimen, baseUrl: string, token: string) {
  return function (dispatch: Function) {
      dispatch({
        type: "SAVE_REGIMEN_START",
        payload: regimen
      });
    let url = baseUrl + REGIMEN_URL;
    return post<Regimen>(url, regimen, authHeaders(token))
           .then(resp => dispatch(saveRegimenOk(resp.data)))
           .catch(err => dispatch(saveRegimenErr(err)));
  };
}

function saveRegimenOk(regimen: Regimen) {
  return { type: "SAVE_REGIMEN_OK", payload: regimen };
}

function saveRegimenErr(error: Error) {
  warning("Unable to save regimen.");
  console.warn(error);
  return { type: "SAVE_REGIMEN_ERR", payload: error };
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
