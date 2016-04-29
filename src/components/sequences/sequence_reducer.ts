import { error, warning } from "../../logger";
import { assign, cloneDeep } from "lodash";
import { Step, Sequence } from "./interfaces";

import { EditCurrentSequence,
    PushStep,
    ChangeStep,
    RemoveStep,
    SaveSequenceOk,
    FetchSequencesOk,
    SelectSequence } from "./sequence_actions";

export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};

const initialState: SequenceReducerState = {
    all: [
        {
            name: "First Sequence",
            color: "red",
            dirty: false,
            steps: [
                {
                    message_type: "move_relative",
                    command: {
                        x: 1,
                        y: 2,
                        z: 3,
                        speed: 4
                    }
                }
            ]
        }
    ],
    current: 0
};

let action_handlers = {
    DEFAULT: function(state, action) {
        return state;
    },

    PUSH_STEP: function(state: SequenceReducerState,
        action: PushStep) {
        let step = cloneDeep<Step>(action.payload.step);
        let newState = cloneDeep<SequenceReducerState>(state);
        let index = action.payload.index;
        if (typeof index === "number") {
            newState.all[newState.current].steps.splice(index, 0, step);
        } else {
            newState.all[newState.current].steps.push(step);
        }
        newState.all[newState.current].dirty = true;
        return newState;
    },

    EDIT_CURRENT_SEQUENCE: function(state: SequenceReducerState,
        action: EditCurrentSequence) {
        let newSequence = assign<{}, Sequence>({}, state.current, action.payload);
        let newState = assign<{}, SequenceReducerState>({},
            state,
            { current: newSequence });
        newState.all[newState.current].dirty = true;
        return newState;
    },

    CHANGE_STEP: function(state: SequenceReducerState,
        action: ChangeStep) {
        let newState = assign<{}, SequenceReducerState>({}, state);
        let steps = newState.all[newState.current].steps;
        let index = action.payload.index;
        let step = steps[index];
        steps[index] = assign<{}, Step>(step, action.payload.step);
        newState.all[newState.current].dirty = true;
        return newState;
    },

    REMOVE_STEP: function(state: SequenceReducerState,
        action: RemoveStep) {
        let newState = assign<{}, SequenceReducerState>({}, state);
        let seq = newState.all[newState.current];
        let index = action.payload.index;
        seq.steps = _.without(seq.steps, seq.steps[index]);
        seq.dirty = true;
        return newState;
    },
    SAVE_SEQUENCE_OK: function(state: SequenceReducerState,
        action: SaveSequenceOk) {
        let newState = assign<{}, SequenceReducerState>({}, state);
        let seq = newState.all[newState.current];
        newState.all[newState.current] = assign<{}, Sequence>({},
            seq,
            action.payload,
            { dirty: false });
        return newState;
    },
    FETCH_SEQUENCES_OK: function(state: SequenceReducerState,
                                action: FetchSequencesOk) {
      let sequences = cloneDeep<Array<Sequence>>(action.payload);
      let newState = cloneDeep<SequenceReducerState>(state);
      newState.all = sequences;
      return newState;
    },
    SELECT_SEQUENCE: function(state: SequenceReducerState,
                              action: SelectSequence) {
      let newState = cloneDeep<SequenceReducerState>(state);
      let inx = action.payload;
      if (newState.all[inx]) { newState.current = inx; }
      return newState;
    }
};

export function sequenceReducer(state = initialState, action) {
    let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
    let result: SequenceReducerState = handler(state, action);
    return result;
}
