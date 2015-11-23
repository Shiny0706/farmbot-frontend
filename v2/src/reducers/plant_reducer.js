import { Plant } from '../models/plant'
import {
  PLANT_ADD_REQUEST
} from '../actions/plant_actions';

const initialState = {
  all: Plant.fakes
};

export function plantReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
  case PLANT_ADD_REQUEST:
    return {
      ...state,
      y: (state.y + 1 < Y_MAX ? state.y + 1 : Y_MAX),
    };
  default:
    return state;
  }
}
