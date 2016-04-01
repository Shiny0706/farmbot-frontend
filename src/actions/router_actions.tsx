import { Plant } from "../models/plant";
import { push } from "react-router-redux";

export function navigateSelectedPlant(plant) {
  return push(Plant.designerUrl(plant));
}
