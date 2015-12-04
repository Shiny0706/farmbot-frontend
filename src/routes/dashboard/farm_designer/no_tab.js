import React from "react";
import { Link } from 'react-router';

export class NoTab extends React.Component {
  render() {
    return(
      <div className="panel-header gray-panel">
        <div className="main-nav-button">
            <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="panel-tabs">
            <ul>
              <li className="hidden-sm hidden-md hidden-lg">
                  <Link to={ "/dashboard/designer?Info=NoTab" } className={"active"}>Designer</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?Info=Plants" }>Plants</Link>
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
    );
  }
};
