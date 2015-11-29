import React from "react";
import { Link } from 'react-router';
import { Plant } from '../../../models/plant'
import { ToolTip } from '../../../components/tooltip';
import { renderCatalog } from './species_catalog';

export class Plants extends React.Component {
  render() {
    return(
      <div className="object-list">
        <label>Current Plants</label>
        <List plants={ this.props.plants.all } />
        <ToolTip href="/dashboard/designer?designer_left_menu=SpeciesCatalog"
                 desc="Add plant"
                 color="dark-green"/>
      </div>
    );
  }
};

class Groups extends React.Component {
  render() {
    return(
      <div>
        <div className="object-list">
          <label>My Groups</label>
          <ul>
            <li>
              <a href="#">Lucky Cabages</a>
              <p>18 Plants</p>
            </li>
            <li>
              <a href="#">Sandwich Sprouts</a>
              <p>142 Plants</p>
            </li>
          </ul>
        </div>
        <div className="object-list">
          <label>Zone Auto-Groups</label>
          <ul>
            <li>
              <a href="#">Plants in Broccoli Overlord</a>
              <p>459 Plants</p>
            </li>
            <li>
              <a href="#">Plants in Flower Patch</a>
              <p>22 Plants</p>
            </li>
          </ul>
        </div>
        <div className="object-list">
          <label>Crop Auto-Groups</label>
          <ul>
            <li>
              <a href="#">All Strawberries</a>
              <p>13 Plants</p>
            </li>
            <li>
              <a href="#">All Flowers</a>
              <p>68 Plants</p>
            </li>
          </ul>
        </div>
        <div className="plus-button">
          <ToolTip action={ renderCatalog }
                      desc="Add group"
                      color="dark-green"/>
        </div>
      </div>
    )
  }
};

export class Zones extends React.Component {
  render() {
    return(
      <div>
        <div className="object-list">
          <label>My Zones</label>
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
        </div>
        <div className="object-list">
          <label>Auto-Zones</label>
          <ul>
            <li>
              <a href="#">Broccoli Overlord</a>
              <p>60 Square Feet</p>
            </li>
          </ul>
        </div>
        <div>
          <ToolTip action={ renderCatalog }
                      desc="Add zone"
                      color="dark-green"/>
        </div>
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
          <p>{plant.age} days old</p>
        </li>);
    };

    return(<ul>
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
        <div className="plant-panel-header">
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
