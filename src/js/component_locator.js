// Resolves a component based on its 'name', which is usually grabbed from the
// URL. Eg 'designer' in the URL `/s/designer`
import { FarmDesigner } from './menus/farm_designer/farm_designer';
import { Controls } from './menus/controls/controls';
import { Devices } from './menus/devices/devices';
import { Sequences } from './menus/sequences/sequences';
import { Schedules } from './menus/schedules/schedules';
import { NotFound } from './menus/not_found';

var choices = {
  'schedules': Schedules,
  'controls' : Controls,
  'designer' : FarmDesigner,
  'devices'  : Devices,
  'notfound' : NotFound,
  'sequences': Sequences
}


export function ComponentLocator(name) {
  var choice = choices[name];
  if (choice) {
    return choice;
  } else {
    console.warn("Cant find component: " + name);
    return NotFound;
  }
}
