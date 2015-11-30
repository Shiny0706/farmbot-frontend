import React from "react";
import { Link } from 'react-router';

export class NoTab extends React.Component {
  render() {
    return(
      <div className="panel-header gray-panel">
        <ul className="panel-tabs">
          <li className="hidden-sm hidden-md hidden-lg">
            <button className="navbar-toggle" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </li>
          <li className="hidden-sm hidden-md hidden-lg">
              <Link to={ "/dashboard/designer?left_tab=NoTab" } className={"active"}>Designer</Link>
          </li>
          <li>
              <Link to={ "/dashboard/designer?left_tab=Plants" }>Plants</Link>
          </li>
          <li>
              <Link to={ "/dashboard/designer?left_tab=Groups" }>Groups</Link>
          </li>
          <li>
              <Link to={ "/dashboard/designer?left_tab=Zones" }>Zones</Link>
          </li>
        </ul>
      </div>
    );
  }
};
