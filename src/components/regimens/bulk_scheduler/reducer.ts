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
    timeOfDay: {hour: 12, minute: 0},
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
  console.log("???")
  return s;
};
