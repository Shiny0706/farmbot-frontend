import { Farmbot } from "farmbot";
import { store } from "../store";
import { devices } from "../device";
import { error, warning } from "../logger";
import { Sequence } from "../sequences/interfaces";
import { Thunk, Everything } from "../interfaces";
import { put } from "axios";
import { DeviceAccountSettings, BotState, HardwareState } from "../devices/interfaces";
import { t } from "i18next";
import { MovementRequest } from "farmbot/bot_commands";
import { ErrorResponse, Response, Notification } from "farmbot/jsonrpc";

const ON = 1, OFF = 0, DIGITAL = 0;

export function settingToggle(name: string, bot: BotState): Function {
  return function (dispatch: Function): Thenable<void> {
    let currentValue: number = (bot.hardware as any)[name];
    return devices
      .current
      .updateCalibration({ [name]: (currentValue === 0) ? ON : OFF })
      .then(res => { dispatch(settingToggleOk(res)); },
      err => { dispatch(settingToggleErr(err)); });
  };
}

export function settingToggleOk(res) {
  return {
    type: "SETTING_TOGGLE_OK",
    payload: res.result
  };
}

export function settingToggleErr(err) {
  error(t("Refresh browser or restart devices."), t("Error while toggling setting"));
  return {
    type: "SETTING_TOGGLE_ERR",
    payload: {}
  };
}


export function pinToggle(num: number): Function {
  return function (dispatch: Function) {
    let currentValue = store.getState().bot.hardware[`pin${num}`];
    let newPinValue = (currentValue === 1) ? 0 : 1;
    return devices
      .current
      .writePin({
        pin_number: num,
        pin_value: newPinValue,
        pin_mode: DIGITAL
      })
      .then(res => dispatch(pinToggleOk(res)),
      err => dispatch(pinToggleErr(err)));
  };
}

export function pinToggleOk(res) {
  return {
    type: "PIN_TOGGLE_OK",
    payload: res.result
  };
}

export function pinToggleErr(err) {
  error(t("Refresh browser or restart devices."), t("Error while toggling pin"));
}

export function changeStepSize(integer: number) {
  return {
    type: "CHANGE_STEP_SIZE",
    payload: integer
  };
}

export function changeAxisBuffer(key: string, val: number) {
  return {
    type: "CHANGE_AXIS_BUFFER",
    payload: { key, val }
  };
}

export function changeSettingsBuffer(key: string, val: number) {
  return {
    type: "CHANGE_SETTINGS_BUFFER",
    payload: { key, val }
  };
}

export function commitSettingsChanges() {
  let { settingsBuffer, hardware } = store.getState().bot;
  let packet = _({})
    .assign(hardware)
    .assign(settingsBuffer)
    .value();
  let promise = devices.current.updateCalibration(packet);
  return function (dispatch: Function): Thenable<void> {
    return promise.then(
      (resp) => dispatch(commitSettingsChangesOk(resp)),
      (err) => dispatch(commitSettingsChangesErr(err)));
  };
}

function commitSettingsChangesOk(_: any) {
  return {
    type: "COMMIT_SETTINGS_OK",
    payload: {}
  };
}

function commitSettingsChangesErr(_: any) {
  error(t("Unable to commit settings changes."));
}

export function commitAxisChanges() {
  let {axisBuffer, hardware} = (store.getState() as Everything).bot;
  let speed: number = devices.current.getState()["speed"] as number;
  /** Pick the value in axisBuffer or hardware settings dictionary.
   *  axisBuffer has higher priortiy, but may not have value available. */
  function pick(attr: string, other?: number) {
    return Number(axisBuffer[attr] || (hardware as any)[attr] || other);
  };
  let packet: MovementRequest = {
    speed: pick("speed", speed),
    x: pick("x"),
    y: pick("y"),
    z: pick("z"),
  };
  return function (dispatch: Function) {
    return devices
      .current
      .moveAbsolute(packet)
      .then((resp) => dispatch(commitAxisChangesOk(resp)),
      (err) => dispatch(commitAxisChangesErr(err)));
  };
}

function commitAxisChangesErr(err) {
  return {
    type: "COMMIT_AXIS_CHANGE_ERR",
    payload: err
  };
}

function commitAxisChangesOk(resp) {
  return {
    type: "COMMIT_AXIS_CHANGE_OK",
    payload: resp.result
  };
}

export function readStatus() {
  return function (dispatch: Function) {
    return devices
      .current
      .readStatus()
      .then((resp: Response<[{ OK: "OK" }]>) => dispatch(botAck(resp)),
      (errr) => dispatch(readStatusErr(errr)));
  };
}

function readStatusOk(status) {
  return {
    type: "READ_STATUS_OK",
    payload: status.result
  };
}

function readStatusErr(msg) {
  error(t("Did you configure your bot? Is it online?"), t("Can't read status"));
  return {
    type: "READ_STATUS_ERR",
    payload: msg
  };
}

// I wish TS had subset types.
export function changeDevice(newAttrs: any) {
  return {
    type: "CHANGE_DEVICE",
    payload: newAttrs
  };
}

export function connectDevice(token: string): {} | ((dispatch: any) => any) {
  return (dispatch) => {
    let bot = new Farmbot({ token });
    return bot
      .connect()
      .then(() => {
        devices.current = bot;
        dispatch(readStatus());
        bot.on("*", function (msg: any) {
            msg = Object(msg); // stay safe, folks.
            switch (msg.method) {
              case "status_update":
                console.log("Got status.");
              case "log_message":
                console.log("Got log.");
            };
        });
      }, (err) => dispatch(fetchDeviceErr(err)));
  };
};

export function sendCommand(payload) {
  let method = devices.current[payload.name];
  let result = method.call(devices.current, payload);
  return (dispatch: Function) => {
    return result.then((res) => sendCommandOk(res, payload, dispatch),
      (e) => sendCommandErr(e, payload, dispatch));
  };
}

function sendCommandOk(res, payload, dispatch: Function) {
  dispatch({ type: "COMMAND_OK", payload: res });
}

function sendCommandErr(e, payload, dispatch: Function) {
  let msg = (payload.name || "Command") + " request failed.";
  error(msg, "Farmbot Didn't Get That!");
}

export function addDevice(deviceAttrs): Thunk {

  return (dispatch, getState) => {
    updateDevice(getState().auth.iss, deviceAttrs, dispatch);
  };
}

function botAck(response: Response<[{ OK: "OK" }]>) {
  return {
    type: "BOT_ACK",
    payload: response
  };
}

function botError(statusMessage: ErrorResponse) {
  error(statusMessage.error.message || t("Unknown error!"));
  console.dir(statusMessage);
  return {
    type: "BOT_ERROR",
    payload: statusMessage
  };
}

function botNotification(statusMessage: Notification<[HardwareState]>) {
  return {
    type: "BOT_CHANGE",
    payload: statusMessage.params[0]
  };
}

function logNotification(botLog:
  Notification<[{ message: string, time: number, status: HardwareState }]>) {
  return {
    type: "BOT_LOG",
    payload: botLog
  };
}

function unknownMessage(statusMessage: any) {
  warning(t("FarmBot sent an unknown message. See log for details."),
    t("Malformed Message"));
  return {
    type: "UNKNOWN_MESSAGE",
    payload: statusMessage
  };
}

function fetchDeviceErr(err: Error) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  };
}

export function execSequence(sequence: Sequence) {
  return (dispatch: Function) => {
    dispatch({ type: "EXEC_SEQUENCE_START", payload: sequence });
    return devices
      .current
      .execSequence(sequence)
      .then(
      (payload) => { dispatch({ type: "EXEC_SEQUENCE_OK", payload }); },
      (e: string) => {
        error(t("Unable to execute sequence. See log for details."))
        console.error("TODO: Fix Farmbotjs timer defer rejection");
      });
  };
};

export let saveAccountChanges: Thunk = function (dispatch, getState) {
  let state = getState();
  let bot = getState().bot.account;
  let url = state.auth.iss;
  return updateDevice(url, bot, dispatch);
};

interface UpdateDeviceParams {
  id?: number;
  name?: string;
  uuid?: string;
  webcam_url?: string;
}

export function updateDevice(apiUrl: string, optns, dispatch: Function) {
  return put<DeviceAccountSettings>(apiUrl + "/api/device", optns)
    .then(res => dispatch({ type: "REPLACE_DEVICE_ACCOUNT_INFO", payload: res.data }))
    .catch((payload) => dispatch({ type: "DEVICE_ACCOUNT_ERR", payload }));
  ;
}
