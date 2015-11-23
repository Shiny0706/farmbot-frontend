import { Plant } from '../models/plant'
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILURE = "ADD_PLANT_FAILURE";
export const FETCH_PLANTS_SUCCESS = "FETCH_PLANTS_SUCCESS";
export const FETCH_PLANTS_FAILURE = "FETCH_PLANTS_FAILURE";

export function addPlant(plant) {
  return dispatch => {
    return Plant.save(plant).then(
      (res) => dispatch(addPlantSuccess(res)),
      (err) => dispatch(addPlantFailure(err))
    );
  };
}

export function fetchAllPlants() {
  return dispatch => {
    return Plant.fetchAll().then(
      (res) => dispatch(fetchPlantsSuccess(res)),
      (err) => dispatch(fetchPlantsFailure(err))
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

function fetchPlantsSuccess(plants){
  return {
    type: FETCH_PLANTS_SUCCESS,
    payload: plants
  }
}

function fetchPlantsFailure(err){
  return {
    type: FETCH_PLANTS_FAILURE,
    payload: err
  }
}
