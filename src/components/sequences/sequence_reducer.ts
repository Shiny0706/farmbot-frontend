import { error, warning } from "../../logger";
import { assign } from "lodash";
import { EditCurrentSequence } from "./sequence_actions";

interface SequenceReducerState {
  current: Sequence;
};

const initialState: SequenceReducerState = {
  current: {
    name: "This is hardcoded.",
    color: "red",
    steps: [
      {
        message_type: "move_relative"
      },
      {
        message_type: "move_relative"
      }
    ]
  }
};

let action_handlers = {
  DEFAULT: function(state, action) {
    return state;
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
};

export function sequenceReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
