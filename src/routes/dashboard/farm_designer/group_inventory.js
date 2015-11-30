import React from "react";
import { Link } from 'react-router';

export class Groups extends React.Component {
  render() {
    return(
      <div className="panel-container cyan-panel">
        <div className="panel-header cyan-panel">
          <ul className="panel-tabs">
            <li>
                <Link to={ "/dashboard/designer?left_tab=Plants" }>Plants</Link>
            </li>
            <li className={"active"}>
                <Link to={ "/dashboard/designer?left_tab=Groups" }>Groups</Link>
            </li>
            <li>
                <Link to={ "/dashboard/designer?left_tab=Zones" }>Zones</Link>
            </li>
          </ul>
        </div>
        <div className="search-box-wrapper">
          <i class="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
        </div>
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
          <div className="plus-button add-group button-like" data-toggle="tooltip" title="Add group" href="/dashboard/designer?left_tab=AddGroup">
            <i className="fa fa-2x fa-plus" />
          </div>
        </div>
      </div>
    )
  }
};
