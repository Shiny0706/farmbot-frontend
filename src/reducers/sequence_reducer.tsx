import { error, warning } from "../logger";



const initialState = {
  current: []
};

let action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  MY_SPECIAL_SEQUENCE: function(state, action) {
    warning("Unable to download plants. Check your internet connection.");
    return state;
  },
}

export function plantReducer(state = initialState, action) {
  let handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
