import React from 'react';
import { Link } from 'react-router';

export var Navbar = React.createClass({
  links: {
    "Farm Designer" : "/dashboard/designer" ,
    "Controls"      : "/dashboard/controls" ,
    "Devices"       : "/dashboard/devices"  ,
    "Sequences"     : "/dashboard/sequences",
    "Regimens"     : "/dashboard/regimens",
    "Schedules"     : "/dashboard/schedules"
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
