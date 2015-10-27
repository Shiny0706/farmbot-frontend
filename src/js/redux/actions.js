import { Plant } from '../models/plant'
import $ from 'jquery';
import { Router } from '../router';
import { store } from './store';

let actions = {};

actions.DEFAULT = function (s, a) {
    console.warn("Unknown action (" + (a.type || 'null') +") fired.");
    console.dir(a || "Empty action payload");
    console.dir(s || "Empty state");
    return s;
};

actions.ROUTE_CHANGE = function(s, a) {
  var additions = a.payload.params;
  var oldParams = s.route;
  var newParams = _.merge({}, oldParams, additions);

  return update(s, {route: newParams});
};

actions.PLANT_ADD_REQUEST = function(s, action) {
  Plant
    .save(action.payload)
    .fail((a, b, c) => alert("Failed to add crop. Refresh page."));
  var plants = _.cloneDeep(s.global.plants);
  var selectedPlant = _.cloneDeep(action.payload);
  plants.push(selectedPlant);
  return update(s, {
    global: {
      plants,
      selectedPlant
    }
  });
};

actions.PLANT_REMOVE_REQUEST = function(s, a) {
  var s = _.cloneDeep(s);
  var id = a.payload._id;
  _.remove(s.global.plants, a.payload);
  Plant
    .destroy(a.payload)
    .fail(() => alert("Failed to delete. Refresh the page."));

  return s;
};

// DO NOT TOUCH!
actions['@@redux/INIT'] = ((s) => s)

function update(old_state, new_state) {
  return _.merge({}, old_state, new_state);
}

export { actions };
