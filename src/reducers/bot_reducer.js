const initialState = {};

var action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  FETCH_DEVICE: function(state, action) {
    return state;
  },
  FETCH_DEVICE_OK: function(state, action) {
    console.log("OK!!");
    return state;
  },
  FETCH_DEVICE_ERR: function(state, action) {
    console.log("NO!!");
    return state;
  },
}

export function botReducer(state = initialState, action) {
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
