// import { ReduxAction } from "../../interfaces";

export function pushWeek() {
  return {
    type: "PUSH_WEEK",
    payload: null
  };
}

export function popWeek() {
  return {
    type: "POP_WEEK",
    payload: null
  };
}
