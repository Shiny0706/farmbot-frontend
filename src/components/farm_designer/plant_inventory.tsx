import * as React from "react";
import { Link } from 'react-router';
import { Plant } from '../../models/plant'

export class Plants extends React.Component<any, any> {
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
                  <Link to={ "/dashboard/designer?p1=NoTab" }>Designer</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?p1=Plants" } className={"active"}>Plants</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?p1=Groups" }>Groups</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?p1=Zones" }>Zones</Link>
              </li>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ "/dashboard/designer?p1=Panel2" }>Calendar</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="panel-content">
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
          <div className="object-list">
            <label>Current Plants</label>
            <List plants={ this.props.plants.all } />
          </div>
        </div>
        <Link to="/dashboard/designer?p1=SpeciesCatalog">
          <div className="plus-button add-plant button-like" data-toggle="tooltip" title="Add plant">
            <i className="fa fa-2x fa-plus" />
          </div>
        </Link>
      </div>
    );
  }
};

export class List extends React.Component<any, any> {
  render() {
    let mapper = function(plant, key) {
      return(
        <li key={ key } >
          <Link to={ Plant.designerUrl(plant) }>{ plant.name }</Link>
          <p>{plant.age} days old</p>
        </li>);
    };

    return(<ul>
             { this.props.plants.map(mapper) }
           </ul>);
  }
};
