import React from 'react';
import { Link } from 'react-router';
import { CONFIG } from '../config';


export var Navbar = React.createClass({
  links: {
    "Farm Designer" : CONFIG.ROOT_URL || "/src" + "/dashboard/designer" ,
    "Controls"      : CONFIG.ROOT_URL || "/src" + "/dashboard/controls" ,
    "Devices"       : CONFIG.ROOT_URL || "/src" + "/dashboard/devices"  ,
    "Sequences"     : CONFIG.ROOT_URL || "/src" + "/dashboard/sequences",
    "Regimens"      : CONFIG.ROOT_URL || "/src" + "/dashboard/regimens",
    "Schedules"     : CONFIG.ROOT_URL || "/src" + "/dashboard/schedules"
  },

  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header drop-shadow">
            <button className="navbar-toggle" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              {
                Object.keys(this.links).map((description) => {
                  var url = this.links[description];
                  return (
                          <li key={url}>
                            <Link to={url}>{description}</Link>
                          </li>
                         )
                })
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
