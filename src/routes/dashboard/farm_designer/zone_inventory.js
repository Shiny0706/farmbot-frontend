import React from "react";
import { Link } from 'react-router';

export class Zones extends React.Component {
  render() {
    return(
      <div className="panel-container brown-panel">
        <div className="panel-header brown-panel">
          <ul className="panel-tabs">
            <li>
                <Link to={ "/dashboard/designer?left_tab=Plants" }>Plants</Link>
            </li>
            <li>
                <Link to={ "/dashboard/designer?left_tab=Groups" }>Groups</Link>
            </li>
            <li className={"active"}>
                <Link to={ "/dashboard/designer?left_tab=Zones" }>Zones</Link>
            </li>
          </ul>
        </div>
        <div className="search-box-wrapper">
          <i class="fa fa-search"></i>
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
        <div className="plus-button add-zone button-like" data-toggle="tooltip" title="Add zone" href="/dashboard/designer?left_tab=AddZone">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    )
  }
};
