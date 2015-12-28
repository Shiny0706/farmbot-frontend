import { CONFIG } from '../config'

export function LOGIN(username, password) {
  return dispatch => {
    return requestToken(username, password).then(
      (res) => dispatch(LOGIN_OK(res.token.encoded)),
      (err) => dispatch(LOGIN_ERR(err))
    );
  };
}

function LOGIN_ERR(err) {
  return {
    type: "LOGIN_ERR",
    payload: err
  };
}

export function LOGIN_OK(token) {
  return {
    type: "LOGIN_OK",
    payload: { token }
  };
}

export function REGISTER(name, email, password, confirmation) {
  return dispatch => {
    return requestRegistration(name, email, password, confirmation).then(
      (res) => dispatch(LOGIN_OK(res.token.encoded)),
      (err) => dispatch(LOGIN_ERR(err))
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
