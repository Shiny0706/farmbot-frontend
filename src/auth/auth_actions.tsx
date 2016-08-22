import * as $ from "jquery";
import { fetchDevice } from "../devices/bot_actions";
import { push } from "../history";
import { fetchSequences } from "../sequences/sequence_actions";
import { fetchRegimens } from "../regimens/actions";
import { post } from "axios";
import { error } from "../logger";
import { AuthState } from "./interfaces";
import { fetchPlants } from "../farm_designer/actions";
import { ReduxAction } from "../interfaces";
import * as Axios from "axios";

export interface AuthResponseToken {
    unencoded: AuthToken;
    encoded: string;
};

export interface AuthResponse {
  token: AuthResponseToken;
};

export function didLogin(authState: AuthState, dispatch: Function) {
    setToken(authState.token);
    dispatch(loginOk(authState));
    dispatch(fetchDevice(authState.token));
    dispatch(fetchSequences());
    dispatch(fetchRegimens(authState.iss));
    dispatch(fetchPlants(authState.iss));
};

// We need to handle OK logins for numerous use cases (Ex: login AND registration)
export function onLogin(dispatch: Function) {
  return (response: AuthResponse) => {
    let tokenData: AuthResponseToken = _.cloneDeep<any>(response.token);
    let authState: AuthState = {
      token: tokenData.encoded,
      sub: tokenData.unencoded.sub,
      jti: tokenData.unencoded.jti,
      iss: tokenData.unencoded.iss,
      mqtt: tokenData.unencoded.mqtt,
      bot: tokenData.unencoded.bot,
      iat: tokenData.unencoded.iat,
      exp: tokenData.unencoded.exp,
      authenticated: true
    };
    didLogin(authState, dispatch);
    push("/app/dashboard/controls");
  };
};

export function login(username: string,
                      password: string,
                      url: string) {
  return dispatch => {
    return requestToken(username, password, url).then(
      onLogin(dispatch),
      (err) => dispatch(loginErr(err))
    );
  };
}

function loginErr(err) {
  return {
    type: "LOGIN_ERR",
    payload: err
  };
}

export interface AuthToken {
  sub: string;
  iat: number;
  jti: string;
  iss: string;
  exp: number;
  mqtt: string;
  bot: string;
  authenticated: boolean;
}

export interface LoginOk {
  type: "LOGIN_OK";
  payload: AuthState;
};

export function loginOk(auth: AuthState): ReduxAction<AuthState> {
  // This is how we attach the auth token to every
  // outbound HTTP request (after user logs in).
  Axios.interceptors.request.use(function(config) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = auth.token;
    return config;
  });
  return {
    type: "LOGIN_OK",
    payload: auth
  };
}

export function register(name: string,
                         email: string,
                         password: string,
                         confirmation: string,
                         url: string) {
  return dispatch => {
    let p = requestRegistration(name,
                                email,
                                password,
                                confirmation,
                                url);
    return p.then((r) => onLogin(dispatch)(r.data),
                  onRegistrationErr(dispatch));
  };
}

export function onRegistrationErr(dispatch) {
  return (err) => {
    let msg = _.values(err.data)
               .join(". ")
               .replace(/nil/g, "empty") || "Unknown server error.";
    error(msg);
    dispatch({
      type: "REGISTRATION_ERROR",
      payload: err
    });
  };
}

function requestRegistration(name: string,
                             email: string,
                             password: string,
                             confirmation: string,
                             url: string) {
  let form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  };
  return post<AuthResponse>(url + "/api/users", form);
}


function requestToken(email: string,
                      password: string,
                      url: string): JQueryXHR {
  // TODO: Replace with AXIOS.get().
  return $.ajax({
    url: url + "/api/tokens",
    type: "POST",
    data: JSON.stringify({ user: { email: email, password: password } }),
    contentType: "application/json"
  });
}

// TODO Someday, we will stop using jQuery. This is mostly for legacy support.
export function setToken(token: string): void {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token);
    }
  });
}
