import { Plant } from '../models/plant'
import {
  ADD_PLANT_SUCCESS,
  ADD_PLANT_FAILURE
} from '../actions/plant_actions';

const initialState = {
  all: Plant.fakes
};

var action_handlers = {
  DEFAULT: function(state, action) {
    return state;
  },
  ADD_PLANT_SUCCESS: function(state, action) {
    state = _.cloneDeep(state)
    state.all.push(action.payload);
    return state;
  },
  ADD_PLANT_FAILURE: function(state, action) {
    console.log('ADD_PLANT_FAILURE');
    return state;
  },
}

export function plantReducer(state = initialState, action) {
  var handler = (action_handlers[action.type] || action_handlers.DEFAULT);
  return handler(state, action);
}
