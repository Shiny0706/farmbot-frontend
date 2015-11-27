import React from "react";
import { Link } from 'react-router';
import { Plant } from '../../../models/plant'
import { ToolTip } from '../../../components/tooltip';
import { renderCatalog } from './species_catalog';

export class Plants extends React.Component {
  render() {
    return(
      <div>
        <List plants={ this.props.plants.all } />
        <ToolTip href="/dashboard/designer?designer_left_menu=SpeciesCatalog"
                 desc="Add a new plant"
                 color="dark-green"/>
      </div>
    );
  }
};

class Groups extends React.Component {
  render() {
    return(
      <div className="designer-info">
        <h6>My Groups</h6>
        <ul>
          <li>
            <a href="#">Lucky Cabages</a>
            <p>5 Plants</p>
          </li>
          <li>
            <a href="#">Lucky Cabages</a>
            <p>5 Plants</p>
          </li>
        </ul>
        <h6>Zone Auto-Groups</h6>
        <ul>
          <li>
            <a href="#">Plants in "Broccoli Overlord"</a>
            <p>10 Plants</p>
          </li>
          <li>
            <a href="#">Plants in "Flower Patch"</a>
            <p>7 Plants</p>
          </li>
        </ul>
        <h6>Crop Auto-Groups</h6>
        <ul>
          <li>
            <a href="#">All Strawberries</a>
            <p>1 plant</p>
          </li>
          <li>
            <a href="#">All Flowers</a>
            <p>42 plants</p>
          </li>
        </ul>
        <ToolTip action={ renderCatalog }
                    desc="Add a new group"
                    color="dark-green"/>
      </div>
    )
  }
};

export class Zones extends React.Component {
  render() {
    return(
      <div className="designer-info">
        <h6>My Zones</h6>
        <ul>
          <li>
            <a href="#">Front area</a>
            <p>18 Square Feet</p>
          </li>
          <li>
            <a href="#">Needs Compost</a>
            <p>5 Square Feet</p>
          </li>
        </ul>
        <h6>Auto-Zones</h6>
        <ul>
          <li>
            <a href="#">Broccoli Overlord</a>
            <p>60 Square Feet</p>
          </li>
        </ul>
        <ToolTip action={ renderCatalog }
                    desc="Add New Zone"
                    color="dark-green"/>
      </div>
    )
  }
};

export class List extends React.Component {
  render() {
    var mapper = function(plant, key) {
      return(
        <li key={ key } >
          <Link to={ Plant.designerUrl(plant) }> { plant.name } </Link>
          <div>{plant.age} days old</div>
        </li>);
    };

    return(<ul className="crop-inventory">
             { this.props.plants.map(mapper) }
           </ul>);
  }
};

export class PlantInventory extends React.Component {
  get tabName() {
    return (this.props.location.query.designer_left_tab || "Plants")
  }

  get content() {
    var component = {Plants, Groups, Zones}[this.tabName];
    return React.createElement(component, this.props);
  }

  isActive(item) {
    var currentTab = this.props.location.query.designer_left_tab;
    var defaultTab = "Plants";
    return (currentTab || defaultTab) === item
  };

  render() {
    return (
      <div>
        <div className="green-content">
          <div className="search-box-wrapper">
            <input className="search" placeholder="Search"/>
          </div>
          <ul className="tabs">
            {
              [
                "Plants",
                "Groups",
                "Zones"
              ].map(function(item, i) {
                var url = "/dashboard/designer?designer_left_tab=" + (item || 'Plants');
                return  <li key={i}>
                          <Link to={ url }
                                className={this.isActive(item) ? "active" : ""}>
                            { item }
                          </Link>
                        </li>;

            }.bind(this))}
          </ul>
        </div>
        { this.content }
      </div>
    )
  }
};
