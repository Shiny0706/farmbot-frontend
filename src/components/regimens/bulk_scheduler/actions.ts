import { warning } from "../../../logger";
import { BulkSchedulerOutput,
    BulkSchedulerState } from "./interfaces";
// import { RegimenItem } from "../interfaces";
import { ReduxAction } from "../../interfaces";
import { Sequence } from "../../sequences/interfaces";

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

export interface ToggleDayParams {
    week: number;
    day: number;
}

export function toggleDay({week, day}: ToggleDayParams) {
    return {
        type: "TOGGLE_DAY",
        payload: {
            week,
            day
        }
    };
}

export function setSequence(sequence: Sequence): ReduxAction<Sequence> {
  return {
    type: "SET_SEQUENCE",
    payload: sequence
  };
};

export function commitBulkEditor(state: BulkSchedulerState):
    ReduxAction<BulkSchedulerOutput|{}> {

    if (!state.sequence) {
      warning("Select a sequence from the dropdown first.");
      return {
        type: "COMMIT_BULK_EDITOR_FAILURE",
        payload: {}
      };
    }

    let index = state.currentRegimen;

    const OFFSET = state.form.dailyOffsetMs;
    const ONE_WEEK = 604800000;
    const ONE_DAY = 86400000;

    let keys = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
    // `weeks` is a two dimensional array of weeks and days.
    // bool flag indicates wether operation will be scheduled that day
    //  of that week.
    const regimenItems = state
        .form  // IS THIS WHAT THAT FUNCTIONAL
        .weeks // PROGRAMMING IS???? READ ABOUT IT ONLINE
        .map((week) =>
            keys.map((key) =>
                week.days[key]))
        .map((weekArray, weekNum) => {
            let weeks = ONE_WEEK * (weekNum + 1);
            return weekArray.map((shouldExecute, dayNum) => {
                let days = ONE_DAY * (dayNum + 1);
                return (shouldExecute) ? (weeks + days + OFFSET) : -1; // lol, In band signaling.
            });
        })
        .reduce((arr, acc) => acc.concat(arr))
        .filter((i) => i !== -1)
        .sort()
        .map((timeOffset) => {
          let sequence = _.cloneDeep(state.sequence);
          return { timeOffset, sequence };
        });

    return {
        type: "COMMIT_BULK_EDITOR",
        payload: { regimenItems, index }
    };
}
