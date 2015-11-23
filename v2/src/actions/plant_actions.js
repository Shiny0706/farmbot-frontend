import { Plant } from '../models/plant'
export const PLANT_ADD_REQUEST = "PLANT_ADD_REQUEST";
export const PLANT_ADD_REQUEST_START = "PLANT_ADD_REQUEST_START";

export function addPlant(plant) {

  return dispatch => {
    // addPlantStart(plant); // SA Copypasta: Is this even make sense?


    return Plant.save(plant).then(
      function (res) { debugger; alert("Plant added :)") }, //dispatch(loginComplete(res.token)),
      (err) => alert("Plant error :(")  //dispatch(loginError(err))
    );
  };
  // var plants = _.cloneDeep(state.global.plants);
  // var selectedPlant = _.cloneDeep(action.payload);
  // plants.push(selectedPlant);
  // return update(state, {
  //   global: {
  //     plants,
  //     selectedPlant
  //   }
  // });
}

function addPlantStart(plant) {
  console.log("SUCH BUSINESS LOGIC! =^_^=");

  return {
    type: PLANT_ADD_REQUEST_START,
    payload: {
      howImFeeling: "Wow!"
    }
  }
}
