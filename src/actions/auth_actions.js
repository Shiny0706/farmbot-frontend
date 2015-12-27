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

function requestToken(email, password) {
  return $.ajax({
      url: CONFIG.FARMBOT_API_URL + "/api/tokens",
      type: "POST",
      data: JSON.stringify({user: {email: email, password: password}}),
      contentType: "application/json"
    })
}
