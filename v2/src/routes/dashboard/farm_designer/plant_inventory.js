import React from "react";
import { Plant } from '../../../models/plant'
import { ToolTip } from '../../../components/tooltip';
import { renderCatalog } from './species_catalog';

export class Plants extends React.Component {
  render() {
    return(
      <div>
        <List plants={ this.props.global.plants } />
        <ToolTip href="#s/designer?designer_left_menu=SpeciesCatalog"
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

export class Item extends React.Component {
  render() {
    var url = "#s/designer?designer_left_menu=PlantInfo&selected_plant_id=" +
              (this.props.crop._id || 0);
    return(
      <li>
        <a href={ url }>
          {this.props.crop.name}
        </a>
        <div>{this.props.crop.age} days old</div>
      </li>);
  }
};

export class List extends React.Component {
  render() {
    var plants = this.props.plants.map(
       (crop, k) => <Item crop={crop} key={ k } />
     );

    return(<ul className="crop-inventory"> { plants } </ul>);
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
    return this.props.location.query.designer_left_tab === item
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
                          <a href={ url }
                             className={this.isActive(item) ? "active" : ""}>
                            { item }
                          </a>
                        </li>;

            }.bind(this))}
          </ul>
        </div>
        { this.content }
      </div>
    )
  }
};
