// Temporarily putting the old style reducer here until I can icrementally start
// matching the new style.
import { Plant } from '../models/plant'
import { Species } from '../models/species'

// This is leftovers from when we were using RLite for routing. Needs to move to
// redux-router.
var routeInitialState = {
    designer_right_menu: 'Calendar',
    designer_left_menu: 'LeftPanel',
    Info: 'Plants',
    plant: 0
};


// I used to namespace shared data under the "global" namespace. This will go in
// to the root level eventually.
var globalInitialState = {
    plants: Plant.fakes,
    species: Species.fakes,
    planting_area: {  // Just a stub for now. See backend API for more info.
      _id: "56154f3e766f6c5789020000",
      device_id: "56154f2f766f6c5789010000",
      length: 600,
      width: 1000
    },
  };

// temporary stubs. Not useful for anything.
export function oldRouteReducer(state = routeInitialState, action) {
  return state;
};

// temporary stubs. Not useful for anything.
export function oldGlobalReducer(state = globalInitialState, action) {
  return state;
};
