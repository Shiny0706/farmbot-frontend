import { post } from "axios";
import { AuthToken } from "../../actions/auth_actions";
import { SequenceOptions,
         Step,
         Sequence } from "./interfaces";

export interface EditCurrentSequence {
  type: "EDIT_CURRENT_SEQUENCE";
  payload: {
    name?: String;
  };
};

export function editCurrentSequence(updates: SequenceOptions): EditCurrentSequence {
  return {
    type: "EDIT_CURRENT_SEQUENCE",
    payload: updates
  };
}

export interface PushStep {
  type: "PUSH_STEP";
  payload: {
    step: Step;
    index?: number;
  };
}

export function pushStep(step: Step, index?: number): PushStep {
  return {
    type: "PUSH_STEP",
    payload: {step, index}
  };
}

type CHANGE_STEP = "CHANGE_STEP";
export interface ChangeStep {
  type: CHANGE_STEP;
  payload: {
    step: Step;
    index: number;
  };
}

export function changeStep(index: number, step: Step): ChangeStep {
  return {
    type: "CHANGE_STEP",
    payload: {step, index}
  };
}

export interface RemoveStep {
  type: "REMOVE_STEP";
  payload: {
    index: number;
  };
};

export function removeStep(index: number): RemoveStep {
  return {
    type: "REMOVE_STEP",
    payload: {index}
  };
}

export interface SaveSequence {
  type: "SAVE_SEQUENCE";
  payload: {};
}

interface SaveSequenceParams {
  sequence: Sequence;
  token: AuthToken;
}

export function saveSequence({sequence, token}: SaveSequenceParams): (d: Function) => Axios.IPromise<any> {
  let url = token.iss + "api/token";
  return dispatch => {
    return post<Sequence>(url, {headers: {Authorization: token.token}})
    .then((a) => { debugger; },
    (b) => { debugger; });
  };
};
