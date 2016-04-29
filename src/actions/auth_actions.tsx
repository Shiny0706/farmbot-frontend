import { fetchDevice } from "./bot_actions";
import { push } from "../history";
import { fetchSequences } from "../components/sequences/sequence_actions";

interface AuthResponse {
  token: {
    unencoded: AuthToken;
    encoded: string;
  };
};

// We need to handle OK logins for numerous use cases (Ex: login AND registration)
let onLogin = (dispatch: Function) => ({token}: AuthResponse) => {
  dispatch(loginOk(token.unencoded));
  dispatch(fetchDevice(token.encoded));
  dispatch(fetchSequences(token.unencoded));
  // Why doesn't push() from react-router-redux work? :(
  push("/app/dashboard/controls");
};

export function login(username, password, url) {
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
  token:  string;
  authenticated: boolean;
}

export function loginOk(token: AuthToken) {
  return {
    type: "LOGIN_OK",
    payload: token
  };
}

export function register(name, email, password, confirmation, url) {
  return dispatch => {
    return requestRegistration(name, email, password, confirmation, url).then(
      onLogin(dispatch),
      (err) => dispatch(loginErr(err))
    );
  };
}

function requestRegistration(name, email, password, confirmation, url) {
  let form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  };
  return $.ajax({
    url: url + "/api/users",
    type: "POST",
    data: JSON.stringify(form),
    contentType: "application/json"
  });
}


function requestToken(email, password, url) {
  return $.ajax({
    url: url + "/api/tokens",
    type: "POST",
    data: JSON.stringify({ user: { email: email, password: password } }),
    contentType: "application/json"
  });
}
