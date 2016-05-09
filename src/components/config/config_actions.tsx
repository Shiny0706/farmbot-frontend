import { didLogin } from "../auth/auth_actions";
import { AuthState } from "../auth/auth_reducer";

export interface ChangeApiUrl {
  type: "CHANGE_API_URL";
  payload: {
    farmbotApiUrl: string;
  };
};

export function changeApiUrl(url: string): ChangeApiUrl {
  return {
    type: "CHANGE_API_URL",
    payload: {
      farmbotApiUrl: url
    }
  };
};

export function ready(e: Event) {
  return (dispatch, getState) => {
    dispatch({ type: "READY", payload: event });
    let state: AuthState = getState().auth;
    if ((state.token || "").length > 30) { // lol
      didLogin(state, dispatch);
      return {type: "READY_HAD_TOKEN", payload: {}};
    } else {
      return {type: "READY_NO_TOKEN", payload: {}};
    };
  };
}
