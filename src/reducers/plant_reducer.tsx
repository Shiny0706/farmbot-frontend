import { Plant } from "../models/plant";
import { error, warning } from "../logger";

interface PlantState {
  all: Plant[];
};

const initialState = {
  all: Plant.fakes
};

let actionHandlers = {
  DEFAULT: function(state: PlantState, action) {
    return state;
  },
  ADD_PLANT_SUCCESS: function(state: PlantState, action) {
    state = _.cloneDeep(state);
    state.all.push(action.payload);
    return state;
  },
  ADD_PLANT_FAILURE: function(state: PlantState, action) {
    error("Unable to add plant.");
    return state;
  },
  FETCH_PLANTS_SUCCESS: function(state: PlantState, action) {
    state = _.cloneDeep(state);
    state.all = action.payload;
    return state;
  },
  FETCH_PLANTS_FAILURE: function(state: PlantState, action) {
    warning("Unable to download plants. Check your internet connection.");
    return state;
  },
};

export function plantReducer(state = initialState, action) {
  let handler = (actionHandlers[action.type] || actionHandlers.DEFAULT);
  return handler(state, action);
}
