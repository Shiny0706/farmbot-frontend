import _ from 'lodash';
import React from "react";
import { Calendar } from './calendar';
import { GardenMap } from './garden_map';
import { Navbar } from './navbar';
import { PlantCatalog } from './plant_catalog';
import { PlantInfo } from './plant_info';
import { SpeciesInfo } from './species_info';
import { PlantInventory } from './plant_inventory';

const MENU_CHOICES = {PlantInventory, PlantCatalog, PlantInfo, SpeciesInfo};

export class FarmDesigner extends React.Component {
  // Dynamically determine what to render on the left side of the designer,
  // based on the value of hash fragment designer_left_menu
  renderLeft() {
    var leftMenu = this.props.route.designer_left_menu || 'PlantInventory';
    var component = MENU_CHOICES[leftMenu];
    if (!component) {
      var msg = `Cant render '${props.component}', valid choices are:`
      var choices = Object.keys(MENU_CHOICES);
      console.warn(msg, choices);
    } else {
      return React.createElement(component, this.props);
    };
  }

  render(){
    return (
        <div className="farm-designer">
          <Navbar/>
          <div className="farm-designer-body">
            <div className="farm-designer-left">
              <div id="designer-left">
                { this.renderLeft() }
              </div>
            </div>

            <div className="farm-designer-middle">
              <GardenMap dispath={this.props.dispatch}
                         route={this.props.route}
                         {...this.props.global}/>
            </div>

            <div className="farm-designer-right">
              <div id="designer-right">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
