import { didLogin } from "../auth/actions";
import { AuthState } from "../auth/interfaces";
import { ReduxAction } from "../interfaces";
import { ChangeApiHost, ChangeApiPort } from "./interfaces";

export function changeApiHost(host: string): ReduxAction<ChangeApiHost> {
  return { type: "CHANGE_API_HOST", payload: { host } };
};

export function changeApiPort(port: string): ReduxAction<ChangeApiPort> {
  return { type: "CHANGE_API_PORT", payload: { port } };
};

export function ready(e: Event) {
  return (dispatch, getState) => {
    dispatch({ type: "READY", payload: event });
    let state: AuthState = getState().auth;
    if ((state.token || "").length > 30) { // lol
      didLogin(state, dispatch);
      return { type: "READY_HAD_TOKEN", payload: {} };
    } else {
      return { type: "READY_NO_TOKEN", payload: {} };
    };
  };
}
