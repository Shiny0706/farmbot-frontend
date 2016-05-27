import { BulkSchedulerState } from "./interfaces";
import { ReduxAction } from "../../interfaces";
import { ToggleDayParams } from "./actions";

export function BulkSchedulerReducer (state: BulkSchedulerState = initialState,
                                     action: ReduxAction<any>): BulkSchedulerState {
  return ({
    SELECT_REGIMEN,
    PUSH_WEEK,
    POP_WEEK,
    SET_TIME_OFFSET,
    TOGGLE_DAY,
  }[action.type] || NONE)(state, action);
}

function newWeek() {
  return {
    days: {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      day6: false,
      day7: false
    }
  };
}

function newState(index: number): BulkSchedulerState {
  return {
    currentRegimen: index, // Sketchy.
    form: {
      dailyOffsetMs: 300000,
      weeks: _.times(7, newWeek)
    }
  };
}

let initialState: BulkSchedulerState = newState(0); // 0 default is sketchy.

interface Handler {
  (state: BulkSchedulerState, action: ReduxAction<any>): BulkSchedulerState;
}

function NONE(s: BulkSchedulerState, a: ReduxAction<any>) {
  return s;
}

function SELECT_REGIMEN(state: BulkSchedulerState,
                        action: ReduxAction<number>) {
  return _.cloneDeep(newState(action.payload));
}

function PUSH_WEEK(s: BulkSchedulerState,
                  a: ReduxAction<any>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.weeks.push(newWeek());
  return s;
}

function POP_WEEK(s: BulkSchedulerState,
                  a: ReduxAction<any>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.weeks.pop();
  return s;
}

function SET_TIME_OFFSET(s: BulkSchedulerState,
                  a: ReduxAction<number>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.dailyOffsetMs = a.payload;
  return s;
}

function TOGGLE_DAY(s: BulkSchedulerState,
                    a: ReduxAction<ToggleDayParams>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  let week = s.form.weeks[a.payload.week];
  let day = `day${a.payload.day}`;
  week.days[day] = !week.days[day];
  return s;
}
