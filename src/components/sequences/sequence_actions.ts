import * as axios from "axios";
import { AuthState } from "../auth/auth_reducer";
import { authHeaders } from "../auth/util";
import { SequenceOptions,
         Step,
         UnplacedStep,
         Sequence,
         Color } from "./interfaces";
import { success, error } from "../../logger";

let colors: Array<Color> = ["blue", "green", "yellow", "orange", "purple", "pink", "gray", "red"];
export function nullSequence(): Sequence {
  let color = _.sample(colors);
  return {
    color,
    name: "New Sequence",
    steps: [],
    dirty: false
  };
}
function fetchSequencesNo(err: Error) {
  return {
    type: "FETCH_SEQUENCE_NO",
    payload: {}
  };
}

export interface FetchSequencesOk {
  type: "FETCH_SEQUENCES_OK";
  payload: Array<Sequence>;
};

function fetchSequencesOk(sequences: Array<Sequence>): FetchSequencesOk {
  return {
    type: "FETCH_SEQUENCES_OK",
    payload: sequences
  };
}

export function fetchSequences() {
  return (dispatch: Function, getState) => {
    let state: AuthState = getState().auth;
    let { iss, token } = state;

    let headers = authHeaders(token);
    axios.get<Array<Sequence>>(`${iss}/api/sequences`, headers)
      .then(({data}) => {
        dispatch(fetchSequencesOk(data));
      }, (e: Error) => {
        error("Could not download sequences");
        dispatch(fetchSequencesNo(e));
      });
  };
};

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
    step: UnplacedStep;
  };
}

export function pushStep(step: UnplacedStep): PushStep {
  return {
    type: "PUSH_STEP",
    payload: {step}
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

export function saveSequence(sequence: Sequence) {
  return function(dispatch, getState) {
    let state: AuthState = getState().auth;
    let { iss, token } = state;
    let url = `${iss}/api/sequences/`;
    let method;
    if (sequence._id) {
      url += sequence._id;
      method = axios.put;
    } else {
      method = axios.post;
    };
    return method(url, sequence, authHeaders(token))
    .then(function(resp) {
      let seq: Sequence = resp.data;
      success(`Saved ${("'" + seq.name + "'") || "sequence"}`);
      dispatch(saveSequenceOk(resp.data));
    },
    function(err) {
      let msg: string = _.values(err.data).join("\n");
      error(`Unable to save ${ ("'" + sequence.name + "'") }.` + msg);
      dispatch(saveSequenceNo(error));
    });
  };
};

export interface SaveSequenceOk {
  type: string;
  payload: Sequence;
}
export function saveSequenceOk(sequence: Sequence) {
  return {
    type: "SAVE_SEQUENCE_OK",
    payload: sequence
  };
}

export function saveSequenceNo(error: any) {
  return {
    type: "SAVE_SEQUENCE_NO",
    payload: error
  };
}

export interface SelectSequence {
  type: "SELECT_SEQUENCE";
  payload: number;
};

export function selectSequence(index: number): SelectSequence {
  return {
    type: "SELECT_SEQUENCE",
    payload: index
  };
}

export function deleteSequence(sequence: Sequence) {
  return (dispatch, getState) => {
    let state: AuthState = getState().auth;
    let { iss, token } = state;

    let p;
    if (sequence._id) {
      let url = `${iss}/api/sequences/${sequence._id}`;
      p = axios.delete(url, authHeaders(token));
    } else {
      p = Promise.resolve();
    };
    p.then(() => {
      dispatch(deleteSequenceOk(sequence));
    }, (no) => {
      error("Unable to delete sequence");
    });
  };
}

export interface DeleteSequenceOk {
  type: "DELETE_SEQUENCE_OK";
  payload: Sequence;
}

export function deleteSequenceOk(sequence: Sequence): DeleteSequenceOk {
  return {
    type: "DELETE_SEQUENCE_OK",
    payload: sequence
  };
};

export function addSequence() {
  return {
    type: "ADD_SEQUENCE",
    payload: {}
  };
}
