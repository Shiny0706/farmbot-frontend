import _ from 'lodash';

let actions = {
  '@@redux/INIT': empty,
  DEFAULT: function (s, a) {
    console.warn("Unknown action fired.");
    console.dir(arguments);
    console.trace();
    return s;
  },
  SPECIES_INFO_SHOW: function(s, a) {
    // TODO: add type system to check for presence of `crop` Object?
    let fragment = {
      leftMenu: {
        component: 'SpeciesInfo',
        selectedSpecies: a.payload
      }
    };
    return update(s, fragment);
  },
  CATALOG_SHOW: function(s, a){
    return changeLeftComponent(s, 'PlantCatalog');
  },
  INVENTORY_SHOW: function(s, a){
    return changeLeftComponent(s, 'PlantInventory');
  },
  INVENTORY_SHOW_TAB: function(s, a) {
    return update(s, {leftMenu: {tab: a.tab}});
  },
}

function empty(s, a) {
  return s;
};

function changeLeftComponent(state, name) {
  return update(state, {leftMenu: {component: name}});
};

function update(old_state, new_state) {
  return _.merge({}, old_state, new_state);
};

export { actions };
