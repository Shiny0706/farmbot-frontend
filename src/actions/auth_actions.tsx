import { fetchDevice } from "./bot_actions";
import { push } from "../history";

export function login(username, password, url) {
  return dispatch => {
    return requestToken(username, password, url).then(
      function (res) {
        dispatch(loginOk(res.token));
        let token = res.token.encoded;
        dispatch(fetchDevice(token));
        console.warn("URL needs to be dynamic, more Redux-y.");
        // Why doesn't push() from react-router-redux work? :(
        push("/app/dashboard/controls");
      },
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

export function loginOk(token) {
  return {
    type: "LOGIN_OK",
    payload: token
  };
}

export function register(name, email, password, confirmation, url) {
  return dispatch => {
    return requestRegistration(name, email, password, confirmation, url).then(
      (res) => dispatch(loginOk(res.token)),
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
      data: JSON.stringify({user: {email: email, password: password}}),
      contentType: "application/json"
    });
}
