import { BulkSchedulerState } from "./interfaces";
import { Sequence } from "../../sequences/interfaces";
import { generateReducer } from "../../generate_reducer";

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
      weeks: _.times(10, newWeek)
    }
  };
}

let initialState: BulkSchedulerState = newState(0); // 0 default is sketchy.
export let BulkSchedulerReducer = generateReducer<BulkSchedulerState>(initialState)
  .add<number>("SELECT_REGIMEN", function(state, action) {
    return newState(action.payload);
  })
  .add<void>("PUSH_WEEK", function(state, action) {
      state.form.weeks.push(newWeek());
      return state;
  })
  .add<void>("POP_WEEK", function(state, action) {
      state.form.weeks.pop();
      return state;
  })
  .add<number>("SET_TIME_OFFSET", function(state, action) {
      state.form.dailyOffsetMs = action.payload;
      return state;
  })
  .add<{week: number, day: number}>("TOGGLE_DAY", function(state, action) {
      let week = state.form.weeks[action.payload.week];
      let day = `day${action.payload.day}`;
      let days = (week.days as {[day: string]: boolean});
      days[day] = !days[day];
      return state;
  })
  .add<void>("COMMIT_BULK_EDITOR", function(state, action) {
    return newState(state.currentRegimen);
  })
  .add<Sequence>("SET_SEQUENCE", function(state, action) {
    state.sequence = action.payload;
    return state;
  });

