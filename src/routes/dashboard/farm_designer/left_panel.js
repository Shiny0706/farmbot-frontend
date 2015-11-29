import React from "react";
import { Link } from 'react-router';
import { Plants } from './plant_inventory';
import { Groups } from './group_inventory';
import { Zones } from './zone_inventory';
import { renderCatalog } from './species_catalog';

export class LeftPanel extends React.Component {
  get tabName() {
    return (this.props.location.query.left_tab || "Plants")
  }

  get content() {
    var component = {Plants, Groups, Zones}[this.tabName];
    return React.createElement(component, this.props);
  }

  isActive(item) {
    var currentTab = this.props.location.query.left_tab;
    var defaultTab = "Plants";
    return (currentTab || defaultTab) === item
  };

  render() {
    return (
      <div>
        <div className="plant-panel-header">
          <ul className="tabs">
            {
              [
                "Plants",
                "Groups",
                "Zones"
              ].map(function(item, i) {
                var url = "/dashboard/designer?left_tab=" + (item || 'Plants');
                return  <li key={i}>
                          <Link to={ url }
                                className={this.isActive(item) ? "active" : ""}>
                            { item }
                          </Link>
                        </li>;

            }.bind(this))}
          </ul>
        </div>
        <div className="search-box-wrapper">
          <i class="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
        </div>
        { this.content }
      </div>
    )
  }
};
