import { Plant } from "../models/plant";
import { pushPath } from "react-router-redux";

export function navigateSelectedPlant(plant) {
  return pushPath(Plant.designerUrl(plant));
}
