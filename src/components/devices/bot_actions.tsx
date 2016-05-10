import { Device } from "../../models/device";
import { Farmbot } from "farmbot";
import { store } from "../../store";
import { devices } from "../../device";
import { error, warning } from "../../logger";
import { Sequence } from "../sequences/interfaces";
import { catchMessage, RPCError } from "./message_catcher";

const ON = 1, OFF = 0, DIGITAL = 0;

export function settingToggle(name: string, bot) {
    return function(dispatch: Function) {
        let currentValue = bot.hardware[name];
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
    error("Refresh browser or restart devices.", "Error while toggling setting");
    return {
        type: "SETTING_TOGGLE_ERR",
        payload: {}
    };
}


export function pinToggle(num) {
    return function(dispatch) {
        let currentValue = store.getState().bot.hardware[`pin${num}`];
        let newPinValue = (currentValue === "on") ? OFF : ON;
        return devices
            .current
            .pinWrite({ pin: num, value1: newPinValue, mode: DIGITAL })
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
    error("Refresh browser or restart devices.", "Error while toggling pin");
    return {
        type: "PIN_TOGGLE_ERR",
        payload: {}
    };
}

export function changeStepSize(integer) {
    return {
        type: "CHANGE_STEP_SIZE",
        payload: integer
    };
}

export function changeAxisBuffer(key, val) {
    return {
        type: "CHANGE_AXIS_BUFFER",
        payload: { key, val }
    };
}

export function changeSettingsBuffer(key, val) {
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
    return function(dispatch) {
        return promise.then(
            (resp) => dispatch(commitSettingsChangesOk(resp)),
            (err) => dispatch(commitSettingsChangesErr(err)));
    };
}

function commitSettingsChangesOk(resp) {
    return {
        type: "COMMIT_SETTINGS_OK",
        payload: {}
    };
}

function commitSettingsChangesErr(err) {
    return {
        type: "COMMIT_SETTINGS_ERR",
        payload: {

        }
    };
}

export function commitAxisChanges() {
    let {axisBuffer, hardware} = store.getState().bot;
    let packet = _({})
        .assign(hardware)
        .assign(axisBuffer)
        .assign({ speed: devices.current.getState("speed") })
        .pick("x", "y", "z", "speed")
        .transform((a, b, c: string) => a[c] = Number(b), {})
        .value();
    return function(dispatch) {
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
    return function(dispatch) {
        return devices
          .current
          .readStatus()
          .then((resp) => dispatch(readStatusOk(resp)),
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
    error("Did you configure your bot? Is it online?", "Can't read status");
    return {
      type: "READ_STATUS_ERR",
      payload: msg
    };
}

export function changeDevice(attributesThatWillChange = { dirty: true }) {
    return {
        type: "CHANGE_DEVICE",
        payload: attributesThatWillChange
    };
}

export function fetchDevice(token: String): {} | ((dispatch: any) => any) {
    return (dispatch) => {
        let bot = new Farmbot({ token });
        return bot
            .connect(() => { }) // TODO: Make this param optional.
            .then(() => {
                devices.current = bot;
                dispatch(readStatus());
                bot.on("*", function(message: any) {
                    let when = catchMessage(message);
                    when({
                      response: (r) => dispatch(botChange(r.result)),
                      error: (r) => dispatch(botError(r.error)),
                      notification: (r) => dispatch(botNotification(r.result)),
                      _: (r) => dispatch(unknownMessage(r))
                    });
                });
            }, (err) => dispatch(fetchDeviceErr(err)));
    };
};

export function sendCommand(payload) {
    let method = devices.current[payload.name];
    let result = method.call(devices.current, payload);
    return (dispatch) => {
        return result.then((res) => sendCommandOk(res, payload, dispatch),
                           (e) => sendCommandErr(e, payload, dispatch));
    };
}

function sendCommandOk(res, payload, dispatch) {
    dispatch({ type: "COMMAND_OK", payload: res });
}

function sendCommandErr(e, payload, dispatch) {
    let msg = (payload.name || "Command") + " request failed.";
    error(msg, "Farmbot Didn't Get That!");
    dispatch({ type: "COMMAND_ERR", payload: e });
}

export function addDevice(deviceAttrs) {

    return (dispatch) => {
        Device
            .save(deviceAttrs)
            .then(function(res) { dispatch(saveDeviceOk(res)); },
            function(err) { dispatch(saveDeviceErr(err)); });
    };
}

function saveDeviceOk(resp) {
    return {
        type: "SAVE_DEVICE_OK",
        payload: resp.data
    };
}

function saveDeviceErr(err) {
    return {
        type: "SAVE_DEVICE_ERR",
        payload: err
    };
}

function botChange(statusMessage) {
    return {
      type: "BOT_CHANGE",
      payload: statusMessage
    };
}

function botError(statusMessage: RPCError) {
    error(statusMessage.error);
    return {
      type: "BOT_ERROR",
      payload: statusMessage
    };
}

function botNotification(statusMessage) {
  return {
    type: "BOT_NOTIFICATION",
    payload: statusMessage
  };
}

function unknownMessage(statusMessage: any) {
  warning("FarmBot sent an unknown message. See log for details.",
          "Malformed Message");
  console.dir(statusMessage);
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
    dispatch({type: "EXEC_SEQUENCE_START", payload: sequence});
    return devices
             .current
             .execSequence(sequence)
             .then(
               (payload) => { dispatch({type: "EXEC_SEQUENCE_OK", payload}); },
               (e: string) => {
                 // This needs to be fixed. FarmbotJS timer deferred promises
                 // should be returning type Error, never string!
                 console.dir(e);
                 dispatch(botError({
                   error: "Unable to execute sequence. See log for details.",
                   method: "TODO: Fix Farmbotjs timer defer rejection"
                 }));
               });
  };
};
