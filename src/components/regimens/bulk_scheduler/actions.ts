// import { ReduxAction } from "../../interfaces";
import { warning } from "../../../logger";

export function pushWeek() {
  return {
    type: "PUSH_WEEK"
  };
}

export function popWeek() {
  return {
    type: "POP_WEEK"
  };
}

/** Sets daily offset of a regimen */
export function setTimeOffset(time: string /**  time string with format `hh:mm aa` */) {
  // Split on " " or ":".
  let [hours, minutes, amPm] = time.split(/\:|\ /);

  let setAmPmOffset = (amPmm: string): number => {
    // Typescript doesnt know about `includes`
    return _(amPmm).capitalize()["includes"]("P") ? 12 : 0;
  };

  let milliseconds = [parseInt(hours) * 3600000,
                      parseInt(minutes) * 60000,
                      setAmPmOffset(amPm) * 3600000]
                      .reduce((num, acc) => num + acc);

  if (_.isNaN(milliseconds) || !_.isNumber(milliseconds)) {
    let m = "Expected regimen time offset to follow format of '12:34 pm'";
    warning(m, "Bad Input");
    return {
      type: "TIME_OFFSET_ERROR",
      payload: 0
    };

  } else {

    return {
      type: "SET_TIME_OFFSET",
      payload: milliseconds
    };
  };
}
