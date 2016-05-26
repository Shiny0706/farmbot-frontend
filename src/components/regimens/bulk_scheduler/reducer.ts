import { BulkSchedulerState } from "./interfaces";
import { ReduxAction } from "../../interfaces";
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
let initialState: BulkSchedulerState = {
  currentRegimen: 0, // Sketchy.
  form: {
    dailyOffsetMs: 300000,
    weeks: _.times(10, newWeek)
  }
};
interface Handler {
  (state: BulkSchedulerState, action: ReduxAction<any>): BulkSchedulerState;
}

export function BulkSchedulerReducer (state: BulkSchedulerState = initialState,
                                     action: ReduxAction<any>): BulkSchedulerState {
  return ({
    SELECT_REGIMEN,
    PUSH_WEEK,
    POP_WEEK,
    SET_TIME_OFFSET,
  }[action.type] || NONE)(state, action);
};

function NONE(s: BulkSchedulerState, a: ReduxAction<any>) {
  return s;
};

function SELECT_REGIMEN(state: BulkSchedulerState,
                        action: ReduxAction<number>) {
  state = _.cloneDeep<BulkSchedulerState>(state);
  state.currentRegimen = action.payload;
  return state;
};

function PUSH_WEEK(s: BulkSchedulerState,
                  a: ReduxAction<any>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.weeks.push(newWeek());
  return s;
};

function POP_WEEK(s: BulkSchedulerState,
                  a: ReduxAction<any>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.weeks.pop();
  return s;
};

function SET_TIME_OFFSET(s: BulkSchedulerState,
                  a: ReduxAction<number>): BulkSchedulerState {
  s = _.cloneDeep<BulkSchedulerState>(s);
  s.form.dailyOffsetMs = a.payload;
  return s;
};
