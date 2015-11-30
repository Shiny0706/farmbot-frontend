import React from "react";
import { Link } from 'react-router';
import { renderCatalog } from './species_catalog';
// Import all of the Plant (green) panel views
import { Plants } from './plant_inventory';
import { NoTab } from './no_tab';
import { SpeciesCatalog } from './species_catalog';
import { SpeciesInfo } from './species_info';
import { PlantInfo } from './plant_info';
// Import all of the Group (blue) panel views
import { Groups } from './group_inventory';
// Import all of the Zone (brown) panel views
import { Zones } from './zone_inventory';


// Dynamically determine what to render in the designer's left panel
// based on the value of hash fragment left_tab
export class LeftPanel extends React.Component {
  get tabName() {
    return (this.props.location.query.left_tab || "Plants")
  }

  get content() {
    var component = {Plants, NoTab, SpeciesCatalog, SpeciesInfo, PlantInfo, Groups, Zones}[this.tabName];
    return React.createElement(component, this.props);
  }

  render() {
    return (
      <div>
        { this.content }
      </div>
    )
  }
};
