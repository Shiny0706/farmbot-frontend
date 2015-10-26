import { Plant } from '../models/plant'
import $ from 'jquery';
import { Router } from '../router';
import { store } from './store';

let actions = {};

actions['@@redux/INIT'] = function(s, a) {
  // This is private!
  return s;
};

actions.DEFAULT = function (s, a) {
    console.warn("Unknown action (" + (a.type || 'null') +") fired.");
    console.dir(a || "Empty action payload");
    console.dir(s || "Empty state");
    return s;
};

actions.POST_INIT = function(s, a) {
  store.dispatch({type: "PLANT_FETCH_REQUEST"});
  return s;
};

actions.ROUTE_CHANGE = function(s, a) {
  var additions = a.payload.params;
  var oldParams = s.route;
  var newParams = _.merge({}, oldParams, additions);

  return update(s, {route: newParams});
};

actions.PLANT_SELECT = function(s, a) {
  var select_crop = update(s, {
    global: {
      selectedPlant: a.payload
    }
  });
  var change_menu = actions.PLANT_INFO_SHOW(select_crop, a);
  return _.merge({}, select_crop, change_menu);
};

actions.PLANT_FETCH_REQUEST = function(state, action) {
  Plant
    .fetchAll()
    .then(function(data){ debugger })
    .catch(function(){ alert("Cant fetch crops.") });

}

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
actions.SPECIES_INFO_SHOW = function(s, a) {
    // TODO: add type system to check for presence of `crop` Object?
    let fragment = {
      leftMenu: {
        component: 'SpeciesInfo',
        selectedSpecies: a.payload
      }
    };
    return update(s, fragment);
  }

actions.PLANT_INFO_SHOW = function(s, a) {
  // TODO: add type system to check for presence of `crop` Object?
  var fragment = {
    leftMenu: {
      component: 'PlantInfo',
      selectedPlant: a.payload
    }
  };
  return update(s, fragment);
};

actions.CATALOG_SHOW = function(s, a) {
  return changeLeftComponent(s, 'PlantCatalog');
};

actions.INVENTORY_SHOW = function(s, a) {
  return changeLeftComponent(s, 'PlantInventory');
};

function changeLeftComponent(state, name) {
  return update(state, {
    leftMenu: {
      component: name
    }
  });
}

function update(old_state, new_state) {
  return _.merge({}, old_state, new_state);
}

export { actions };
