import * as React from "react";
import { Link } from 'react-router';

export class Groups extends React.Component<any, any> {
  render() {
    return(
      <div className="panel-container cyan-panel">
        <div className="panel-header cyan-panel">
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
                  <Link to={ "/dashboard/designer?p1=Plants" }>Plants</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?p1=Groups" } className={"active"}>Groups</Link>
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
          </div>
          <Link to="/dashboard/designer?p1=AddGroup">
            <div className="plus-button add-group button-like" data-toggle="tooltip" title="Add group">
              <i className="fa fa-2x fa-plus" />
            </div>
          </Link>
        </div>
      </div>
    )
  }
};
