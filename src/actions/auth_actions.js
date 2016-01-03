import { CONFIG } from '../config'

export function login(username, password) {
  return dispatch => {

    return requestToken(username, password).then(
      function (res) {
        dispatch(fetchDevice());
        dispatch(loginOk(res.token.encoded));
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
    payload: { token }
  };
}

export function register(name, email, password, confirmation) {
  return dispatch => {
    return requestRegistration(name, email, password, confirmation).then(
      (res) => dispatch(loginOk(res.token.encoded)),
      (err) => dispatch(loginErr(err))
    );
  };
}

function requestRegistration(name, email, password, confirmation) {
  var form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  }
  return $.ajax({
      url: CONFIG.FARMBOT_API_URL + "/api/users",
      type: "POST",
      data: JSON.stringify(form),
      contentType: "application/json"
    })
}


function requestToken(email, password) {
  return $.ajax({
      url: CONFIG.FARMBOT_API_URL + "/api/tokens",
      type: "POST",
      data: JSON.stringify({user: {email: email, password: password}}),
      contentType: "application/json"
    })
}
