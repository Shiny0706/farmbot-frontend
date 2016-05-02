import { error, warning } from "../../logger";
import { assign, cloneDeep } from "lodash";
import { Step,
         Sequence,
         SequenceReducerState } from "./interfaces";
import { nullSequence } from "./sequence_actions";
import { EditCurrentSequence,
         PushStep,
         ChangeStep,
         RemoveStep,
         SaveSequenceOk,
         FetchSequencesOk,
         SelectSequence,
         DeleteSequenceOk } from "./sequence_actions";

function populate(state: SequenceReducerState): Sequence {
  // This worries me. What if #current and #all get out of sync?
  let current_sequence = nullSequence();
  state.all.unshift(current_sequence);
  state.current = 0;
  return current_sequence;
}

const initialState: SequenceReducerState = {
    all: [
      {
        color: "red",
        name: "New Sequence",
        steps: [],
        dirty: true
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
        let current_sequence = newState.all[newState.current] || populate(newState);
        if (typeof index === "number") { // NOTE: index is optional
            current_sequence.steps.splice(index, 0, step);
        } else { //  If index unspecified, push to top of stack.
            current_sequence.steps.push(step);
        }
        newState.all[newState.current].dirty = true;
        return newState;
    },

    EDIT_CURRENT_SEQUENCE: function(state: SequenceReducerState,
        action: EditCurrentSequence) {
        let newState = cloneDeep<SequenceReducerState>(state);
        let currentSequence = newState.all[newState.current] || populate(newState);
        currentSequence.dirty = true;
        assign<{}, Sequence>(currentSequence, action.payload);
        return newState;
    },

    CHANGE_STEP: function(state: SequenceReducerState,
        action: ChangeStep) {
        let newState = assign<{}, SequenceReducerState>({}, state);
        let steps = newState.all[newState.current].steps || populate(newState).steps;
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
    },
    DELETE_SEQUENCE_OK: function(state: SequenceReducerState,
        action: DeleteSequenceOk) {
    let newState = cloneDeep<SequenceReducerState>(state);
    let index = newState.current;
    _.remove(newState.all, action.payload);
    newState.current = ((index === 0) ? index : newState.current - 1);
    return newState;
  },
  ADD_SEQUENCE: function(state: SequenceReducerState, _action) {
    let newState = cloneDeep<SequenceReducerState>(state);
    let before = cloneDeep(newState.all);
    populate(newState);
    let after = cloneDeep(newState.all);
    return newState;
  }
};

export function sequenceReducer(state = initialState, action) {
    let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
    let result: SequenceReducerState = handler(state, action);
    return result;
}
