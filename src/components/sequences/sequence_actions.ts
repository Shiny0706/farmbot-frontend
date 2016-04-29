import * as axios from "axios";
import { AuthToken, AuthResponseToken } from "../auth/auth_actions";
import { authHeaders } from "../auth/util";
import { SequenceOptions,
         Step,
         Sequence } from "./interfaces";
import { success, error } from "../../logger";

export function nullSequence(): Sequence {
  return {
    color: "red",
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

export function fetchSequences(token: AuthResponseToken) {
  return (dispatch: Function) => {
    let url = token.unencoded.iss;
    let headers = authHeaders(token.unencoded);
    axios.get<Array<Sequence>>(`${url}api/sequences`, headers)
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

interface SaveSequenceParams {
  sequence: Sequence;
  token: AuthToken;
}

export function saveSequence({sequence, token}: SaveSequenceParams): (d: Function) => Axios.IPromise<any> {
  let url = token.iss + "api/sequences";
  return dispatch => {
    return axios.post<Sequence>(url, sequence, authHeaders(token))
    .then(function(resp) {
      let seq = resp.data;
      success(`Saved ${("'" + seq.name + "'") || "sequence"}`);
      dispatch(saveSequenceOk(seq));
    },
    function(err) {
      let msg = _.values(err.data).join("\n");
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

export function deleteSequence(sequence: Sequence, token: AuthToken) {
  return (dispatch) => {
    let p;
    if (sequence._id) {
      let url = `${token.iss}api/sequences/${sequence._id}`;
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
