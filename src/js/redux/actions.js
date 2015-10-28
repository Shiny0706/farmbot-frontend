// All Redux actions are namespaced under the 'actions' object for convinience.
// an `update()` helper method handles cloning/modifying the current state.

import { Plant } from '../models/plant'
import $ from 'jquery';
import { Router } from '../router';
import { store } from './store';

var actions = {};

actions.DEFAULT = function (state, action) {
    console.warn("Unknown action (" + (action.type || 'null') +") fired.");
    return state;
};

actions.ROUTE_CHANGE = function(state, action) {
  var additions = action.payload.params;
  var oldParams = state.route;
  var newParams = _.merge({}, oldParams, additions);

  return update(state, {route: newParams});
};

actions.PLANT_ADD_REQUEST = function(state, action) {
  Plant
    .save(action.payload)
    .fail((a, b, c) => alert("Failed to add crop. Refresh page."));
  var plants = _.cloneDeep(state.global.plants);
  var selectedPlant = _.cloneDeep(action.payload);
  plants.push(selectedPlant);
  return update(state, {
    global: {
      plants,
      selectedPlant
    }
  });
};

actions.PLANT_REMOVE_REQUEST = function(state, action) {
  // This needs Redux thunk or something like that.
  Plant.destroy(action.payload).then(() => console.log("Fix me"))
  return state
};

// DO NOT TOUCH!
actions['@@redux/INIT'] = ((state) => state)

function update(old_state, new_state) {
  return _.merge({}, old_state, new_state);
}

export { actions };
