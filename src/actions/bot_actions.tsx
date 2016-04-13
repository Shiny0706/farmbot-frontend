import { Device } from "../models/device";
import { Farmbot } from "farmbot";
import { store } from "../store";
import { devices } from "../device";
import { success, error } from "../logger";

const ON = 1, OFF = 0, DIGITAL = 0;

export function settingToggle(name, bot) {
    return function(dispatch) {
        console.warn("This does not work. Fix ASAP.");
        let currentValue: any = 0; // devices.current.hardware[name];
        let packet = {
            name: (currentValue === 0) ? ON : OFF
        };
        let promise = devices.current.updateCalibration(packet);
        return promise.then(res => dispatch(settingToggleOk(res)),
            err => dispatch(settingToggleErr(err)));
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
        .transform((a, b, c) => a[c] = Number(b), {})
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
    let promise = devices.current.readStatus();
    return function(dispatch) {
        return promise.then(function(resp) {
            dispatch(readStatusOk(resp));
        }, readStatusErr);
    };
}

function readStatusOk(status) {
    return {
        type: "READ_STATUS_OK",
        payload: status.result
    };
}

function readStatusErr(msg) {
    error("Attempted to read status, but failed. See logs for details.",
        "Read Status Error");
    console.warn("READSTATUSERR", msg);
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
                bot.readStatus();
                bot.on("*", function(resp) {
                    let botState = resp.result || resp.error || {};
                    dispatch(botChange(botState));
                });
                dispatch(fetchDeviceOk(bot));
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

function fetchDeviceOk(bot) {
    return {
        type: "FETCH_DEVICE_OK",
        payload: bot
    };
}

function botChange(botState) {
    return {
        type: "BOT_CHANGE",
        payload: botState
    };
}

function fetchDeviceErr(err) {
    return {
        type: "FETCH_DEVICE_ERR",
        payload: err
    };
}
