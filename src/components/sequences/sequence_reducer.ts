import { error, warning } from "../../logger";
import { assign } from "lodash";
import { EditCurrentSequence,
         PushStep,
         ChangeStep,
         RemoveStep } from "./sequence_actions";

interface SequenceReducerState {
  current: Sequence;
};

const initialState: SequenceReducerState = {
  current: {
    name: "This is hardcoded.",
    color: "red",
    dirty: false,
    steps: [
      {
        message_type: "move_relative",
        x: 0,
        y: 0,
        z: 1,
        speed: 100
      }
    ]
  }
};

let action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },

  PUSH_STEP: function(state: SequenceReducerState,
                      action: PushStep) {
    let step = assign<{}, Step>({}, action.payload.step);
    let newState = assign<{}, SequenceReducerState>({}, state);
    let index = action.payload.index;
    if (typeof  index === "number") {
      newState.current.steps.splice(index, 0, step);
    } else {
      newState.current.steps.push(step);
    }
    newState.current.dirty = true;
    return newState;
  },

  EDIT_CURRENT_SEQUENCE: function(state: SequenceReducerState,
                                  action: EditCurrentSequence) {
    let newSequence = assign<{}, Sequence>({}, state.current, action.payload);
    let newState = assign<{}, SequenceReducerState>({},
                                                    state,
                                                    { current: newSequence });
    newState.current.dirty = true;
    return newState;
  },

  CHANGE_STEP: function(state: SequenceReducerState,
                        action: ChangeStep) {
    let newState = assign<{}, SequenceReducerState>({}, state);
    let steps = newState.current.steps;
    let index = action.payload.index;
    let step = steps[index];
    steps[index] = assign<{}, Step>(step, action.payload.step);
    newState.current.dirty = true;
    return newState;
  },

  REMOVE_STEP: function(state: SequenceReducerState,
                        action: RemoveStep) {
    let newState = assign<{}, SequenceReducerState>({}, state);
    newState.current.steps = _.without(newState.current.steps, newState.current.steps[action.payload.index]);
    newState.current.dirty = true;
    return newState;
  }
};

export function sequenceReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  let result: SequenceReducerState = handler(state, action);
  return result;
}
