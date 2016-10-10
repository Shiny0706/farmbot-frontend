import * as axios from "axios";
import { Everything, Thunk } from "../interfaces";
import { AuthState } from "../auth/interfaces";
import { SequenceOptions,
         Step,
         Sequence } from "./interfaces";
import { success, error } from "../logger";
import { prettyPrintApiErrors } from "../util";
import { Color, ReduxAction } from "../interfaces";
import  * as i18next  from "i18next";


export function nullSequence(): Sequence {
  return {
    color: "gray",
    name: "New Sequence",
    kind: "sequence",
    args: {},
    body: [],
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
  return (dispatch: Function, getState: Function) => {
    let state: AuthState = getState().auth;
    let { iss } = state;

    axios.get<Sequence[]>(`${iss}/api/sequences`)
      .then(({data}) => {
        dispatch(fetchSequencesOk(data));
      }, (e: Error) => {
        error(i18next.t("Could not download sequences"));
        dispatch(fetchSequencesNo(e));
      });
  };
};

export interface EditCurrentSequence {
    name?: string;
    color?: Color;
  };

export function editCurrentSequence(updates: SequenceOptions): ReduxAction<EditCurrentSequence> {
  return {
    type: "EDIT_CURRENT_SEQUENCE",
    payload: updates
  };
}

export interface PushStep {
  type: "PUSH_STEP";
  payload: {
    step: Step;
  };
}

export function pushStep(step: Step): PushStep {
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

export function saveSequence(sequence: Sequence): Thunk {
  return function(dispatch, getState) {
    let state: AuthState = getState().auth;
    let { iss} = state;
    let url = `${iss}/api/sequences/`;
    let method: Function;
    if (sequence.id) {
      url += sequence.id;
      method = axios.put;
    } else {
      method = axios.post;
    };
    return method(url, sequence)
    .then(function(resp: {data: Sequence }) {
      success( i18next.t("Saved '{{SequenceName}}'",
        { SequenceName: (sequence.name || "sequence") } ));
      dispatch(saveSequenceOk(resp.data));
    },
    function(err: {response: { data: {[reason: string]: string}; }}) {
      let template = "Unable to save '{{SequenceName}}'";
      let context = { SequenceName: (sequence.name || "sequence") };
      error(prettyPrintApiErrors(err),
            i18next.t(template , context));
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

export function addSequence() {
  return {
    type: "ADD_SEQUENCE",
    payload: {}
  };
}

export function addComment(step: Step, index: number, comment: string) {
  return {
    type: "ADD_COMMENT",
    payload: { comment, index }
  }
}

export function deleteSequence(index: number) {
  // use cases: 
  // unsaved sequence. (in state)
  // saved sequence  (http DELETE)
  // misc errors 
  // dependency error. 

  return function(dispatch: Function, getState: Function){
    let state: Everything = getState();
    let { iss } = state.auth;
    let sequence: Sequence = state.sequences.all[index];

    function deleteSequenceOK() {
      dispatch( {
        type: "DELETE_SEQUENCE_OK",
        payload: sequence
      });
    }

    interface SequenceApiResponse {
      sequence?: string;
    }
    function deleteSequenceErr(response: Axios.AxiosXHR<SequenceApiResponse> ) {
      if (response && response.data.sequence ) {
        error(response.data.sequence);
      } else {
        error(i18next.t("Unable to delete sequence"));
      }
    }

    if (sequence.id) {
      let url = `${iss}/api/sequences/` + sequence.id;
      axios.delete(url)
        .then(deleteSequenceOK)
        .catch(deleteSequenceErr);
    }else {
      // Sequence is unsaved.
      deleteSequenceOK();
    }
  };
}
