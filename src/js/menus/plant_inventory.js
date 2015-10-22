import React from "react";
import { Plant } from '../models/plant';
import { store } from '../app';
import { ToolTip } from './tooltip'
import { renderCatalog } from './plant_catalog';

export class Tab extends React.Component {
  render() {
    return <li onClick={ this.handleClick.bind(this) }>
            <a href="#"
               className={this.props.active ? "active" : ""}>
              { this.props.name }
            </a>
           </li>
  }

  handleClick() {
    this.props.dispatch({type: "INVENTORY_SHOW_TAB", tab: this.props.name});
  }
}


export class Plants extends React.Component {
  render() {
    return(
      <div>
        <List plants={ Plant.fakePlants } />
        <ToolTip action={ () => this.props.dispatch({type: "CATALOG_SHOW"}) } desc="Add a new plant" color="dark-green"/>
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
    return(
      <li>
        <a href="#"> {this.props.crop.name} </a>
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
  get tabName() { return (this.props.tab || "Plants") };
  get content() {
    var component = {Plants, Groups, Zones}[this.tabName];
    return React.createElement(component,
                               {dispatch: this.props.dispatch});
  };
  isActive(item) { return this.tabName === item };

  render() {
    return (
      <div>
        <div className="green-content">
          <div className="search-box-wrapper">
            <input className="search" placeholder="Search"/>
          </div>
          <ul className="tabs">
            {
              ["Plants", "Groups", "Zones"].map(function(item, i) {
                return <Tab key={i}
                            name={item}
                            dispatch={this.props.dispatch}
                            active={this.isActive(item)}/>;
            }.bind(this))}
          </ul>
        </div>
        { this.content }
      </div>
    )
  }
};
