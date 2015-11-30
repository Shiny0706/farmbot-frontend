import React from "react";
import { Link } from 'react-router';

export class Zones extends React.Component {
  render() {
    return(
      <div className="panel-container brown-panel">
        <div className="panel-header brown-panel">
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
                  <Link to={ "/dashboard/designer?Info=Plants" }>Plants</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Groups" }>Groups</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Zones" } className={"active"}>Zones</Link>
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
        <div className="plus-button add-zone button-like" data-toggle="tooltip" title="Add zone" href="/dashboard/designer?Info=AddZone">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    )
  }
};
