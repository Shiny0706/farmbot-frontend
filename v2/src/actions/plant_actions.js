import { Plant } from '../models/plant'
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILURE = "ADD_PLANT_FAILURE";

export function addPlant(plant) {
  return dispatch => {
    return Plant.save(plant).then(
      (res) => dispatch(addPlantSuccess(plant)), //dispatch(loginComplete(res.token)),
      (err) => dispatch(addPlantFailure(err))  //dispatch(loginError(err))
    );
  };
}

function addPlantSuccess(plant) {
  return {
    type: ADD_PLANT_SUCCESS,
    payload: plant
  }
}

function addPlantFailure(err) {
  return {
    type: ADD_PLANT_FAILURE,
    payload: err
  }
}
