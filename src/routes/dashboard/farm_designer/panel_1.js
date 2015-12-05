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
// Import the right panel (for display on mobile)
import { Panel2 } from './panel_2';


// Dynamically determine what to render in the designer's first panel
// based on the value of hash fragment 'p1'
export class Panel1 extends React.Component {
  get tabName() {
    return (this.props.location.query.p1 || "Plants")
  }

  get content() {
    var component = {Plants, NoTab, SpeciesCatalog, SpeciesInfo, PlantInfo, Groups, Zones, Panel2}[this.tabName];
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
