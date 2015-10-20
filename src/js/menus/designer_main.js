import _ from 'lodash';
import React from "react";
import { Calendar } from './calendar';
import { CropInfo } from './crop_info';
import { GardenMap } from './garden_map';
import { Navbar } from './navbar';
import { PlantCatalog } from './plant_catalog';
import { PlantInfo } from './plant_info';
import { SpeciesInfo } from './species_info';
import { PlantInventory } from './plant_inventory';

const MENU_CHOICES = {PlantInventory, PlantCatalog, CropInfo, SpeciesInfo}

export class DesignerMain extends React.Component {
  transferableProps(name){
    return _.merge({}, this.props.global, {dispatch: this.props.dispatch}, this.props[name]);
  };

  // Dynamically determine what to render on the left side of the designer,
  // based on the value of getStore().leftMenu.component
  renderLeft() {
    var props = this.transferableProps("leftMenu");
    var component = MENU_CHOICES[props.component];
    if (!component) {
      var msg = `Attempted to render component ${props.component}, but valid choices are:`
      var choices = Object.keys(MENU_CHOICES);
      console.warn(msg, choices);
    } else {
      return React.createElement(component, props);
    };
  }

  renderMiddle(){
    return React.createElement(GardenMap,
                               this.transferableProps("middleMenu"));
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
              { this.renderMiddle() }
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
