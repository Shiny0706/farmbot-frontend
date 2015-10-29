// This is a "poor mans hot re-loader". It's just a module that either:
// 1. stores state in localStorage for persistence across page reloads.
// 2. Supplies a default value for new users. (appState.defaultState)
// 3. Resets state to default state if anything goes wrong.

import { Plant } from '../models/plant';
import { Species } from '../models/species';

export var appState = {
  getState: function() {
    var stored = localStorage["FARMBOT_DESIGNER_CACHE"];
    try {
      return (stored ? JSON.parse(stored) : this.defaultState);
    } catch(e) {
      console.warn("Error while loading app state from localStorage. " +
                   "Reseting app state.");
      this.saveState(this.defaultState);
      return this.defaultState;
    };

  },
  saveState: function (state) {
    return localStorage["FARMBOT_DESIGNER_CACHE"] = JSON.stringify(state);
  },
  // Yes, it needs to be snake case.
  defaultState: {
      // State stored in the URL hash for bookmarks / sharing / back button use.
      route: {
        designer_right_menu: 'Calendar',
        designer_left_menu: 'PlantInventory',
        designer_left_tab: 'Plants',
        selected_plant_id: 0
      },
      // Everything else.
      global: {
        plants: Plant.fakes,
        species: Species.fakes,
        planting_area: {  // Just a stub for now. See backend API for more info.
                         _id: "56154f3e766f6c5789020000",
                         device_id: "56154f2f766f6c5789010000",
                         length: 300,
                         width: 600
                       },
      }
    }
  };
