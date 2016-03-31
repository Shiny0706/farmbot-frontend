import * as React from "react";
import { Link } from 'react-router';

export class NoTab extends React.Component<any, any> {
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
                  <Link to={ "/dashboard/designer?p1=NoTab" } className={"active"}>Designer</Link>
              </li>
              <li>
                  <Link to={ "/dashboard/designer?p1=Plants" }>Plants</Link>
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
    );
  }
};
