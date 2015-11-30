import React from 'react';
import { Link } from 'react-router';

var links = {
  "/dashboard/designer" : "Farm Designer",
  "/dashboard/controls" : "Controls",
  "/dashboard/devices"  : "Devices",
  "/dashboard/sequences": "Sequences",
  "/dashboard/schedules": "Schedules"
}


export var Navbar = React.createClass({
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
                Object.keys(links).map(function (url) {
                  var description = links[url];
                  return (
                          <li>
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
