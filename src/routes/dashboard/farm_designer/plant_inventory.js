import React from "react";
import { Link } from 'react-router';
import { Plant } from '../../../models/plant'

export class Plants extends React.Component {
  render() {
    return(
      <div className="panel-container green-panel">
        <div className="panel-header green-panel">
          <div className="main-nav-button">
            <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="panel-tabs">
            <ul>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ "/dashboard/designer?Info=NoTab" }>Designer</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Plants" } className={"active"}>Plants</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Groups" }>Groups</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Zones" }>Zones</Link>
              </li>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ "/dashboard/designer?Info=Calendar" }>Calendar</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="search-box-wrapper">
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
        </div>
        <div className="object-list">
          <label>Current Plants</label>
          <List plants={ this.props.plants.all } />
        </div>
        <div className="plus-button add-plant button-like" data-toggle="tooltip" title="Add plant" href="/dashboard/designer?Info=SpeciesCatalog">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    );
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
