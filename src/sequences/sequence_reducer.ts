import { assign, cloneDeep } from "lodash";
import { Step,
         Sequence,
         UnplacedStep,
         SequenceReducerState } from "./interfaces";
import { nullSequence } from "./sequence_actions";
import { EditCurrentSequence,
         PushStep,
         ChangeStep,
         RemoveStep,
         SaveSequenceOk,
         FetchSequencesOk,
         SelectSequence } from "./sequence_actions";
import { ReduxAction } from "../interfaces";
import { generateReducer } from "../generate_reducer";

/** Adds an empty sequence to the front of the list. */
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
        seq.steps = repositionSteps(seq.steps);
        seq.dirty = true;
        return newState;
    },
    SAVE_SEQUENCE_OK: function(state: SequenceReducerState,
                               action: SaveSequenceOk) {
        let newState = cloneDeep<SequenceReducerState>(state);
        let seq = cloneDeep<Sequence>(action.payload);
        newState.all[newState.current] =  seq;
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
                                 action: ReduxAction<Sequence>) {
    let index = state.all.indexOf(action.payload);
    let nextState = _.cloneDeep<SequenceReducerState>(state);
    if (index === -1 ) {
        throw new Error("Tried to delete a sequence that doesn't exist. ");
    }else {
        state.all.slice(index, 1);
        state.current = 0;
    }
    return nextState;
  },

};

export let sequenceReducer = generateReducer<SequenceReducerState>(initialState)
  .add<{ step: UnplacedStep }>("PUSH_STEP", function(state, action) {
        let current_sequence = state
                                 .all[state.current] || populate(state);
        let { step } = action.payload;
        let newArr = <(Step|UnplacedStep)[]>[current_sequence.steps, ...[step]];
        current_sequence.steps = repositionSteps(newArr);
        current_sequence.dirty = true;
        return state;
    })
  .add<void>("ADD_SEQUENCE", function(state, action) {
    populate(state);
    return state;
  });
/** Transforms input array of steps into new step array where all elements have
    a position attirbute that is equal to their `index` in the array. */
function repositionSteps(steps: (Step|UnplacedStep)[]): Step[] {
  let transform = (step, position): Step => {
    return assign<any, Step>({}, step, {position});
  };
  return steps.map(transform);
}
