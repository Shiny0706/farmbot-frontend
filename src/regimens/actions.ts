import { Regimen, RegimenItem } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { warning } from "../logger";
import * as Axios from "axios";
import { regimenSerializer } from "./serializers";

const REGIMEN_URL = "api/regimens/";

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

    return Axios.post<Regimen>(baseUrl + REGIMEN_URL,
      regimenSerializer(regimen))
      .then(resp => dispatch(saveRegimenOk(resp.data)))
      .catch(err => dispatch(saveRegimenErr(err)));
  };
}

function saveRegimenOk(regimen: Regimen) {
  return { type: "SAVE_REGIMEN_OK", payload: regimen };
}

function saveRegimenErr(error: Error) {
  warning("Unable to save regimen.");
  return { type: "SAVE_REGIMEN_ERR", payload: error };
}

export function deleteRegimen(regimen: Regimen,
  baseUrl: string,
  token: string) {
  return function (dispatch) {
    if (regimen && regimen._id) {
      let url = baseUrl + REGIMEN_URL + regimen._id;
      Axios.delete(url);
    } else {
      warning("TODO: Deletion of unsaved regimens.")
    };
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

export function fetchRegimens(apiUrl: string) {
  return function (dispatch) {
    return Axios
      .get<Regimen[]>(apiUrl + REGIMEN_URL)
      .then(r => dispatch({
        type: "FETCH_REGIMENS_OK",
        payload: r.data
      }))
      .catch(e => {
        warning("Could not download regimens.");
        dispatch({
          type: "FETCH_REGIMENS_ERR",
          payload: e
        });
      });
  };
};
