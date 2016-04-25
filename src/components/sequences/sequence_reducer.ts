import { error, warning } from "../../logger";
interface InitialState {
  current: Sequence;
};

const initialState: InitialState = {
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
  MY_SPECIAL_SEQUENCE: function(state, action) {
    warning("You should never see this message.");
    return state;
  },
};

export function sequenceReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
