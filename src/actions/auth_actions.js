import { CONFIG } from '../config';
import { fetchDevice } from './bot_actions';

export function loginFromToken(token) {
  // Acrobatic act to reuse prexisting action creators (loginok, fetchdevice)
  var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log("??")
      resolve(token);
    }, 10);
  });
  console.log("???")
  return dispatch => {
      console.log("?")
    return p.then(
      function (res) {
        console.log("!")
        dispatch(loginOk(token));
        dispatch(fetchDevice());
      },
      (err) => dispatch(loginErr(err))
    );
  };
}


export function login(username, password) {
  return dispatch => {

    return requestToken(username, password).then(
      function (res) {
        dispatch(loginOk(res.token.encoded));
        dispatch(fetchDevice());
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
