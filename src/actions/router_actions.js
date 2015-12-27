import { Plant } from '../models/plant';
import { pushPath } from 'redux-simple-router';

export function navigateSelectedPlant(plant) {
  return pushPath(Plant.designerUrl(plant));
}
