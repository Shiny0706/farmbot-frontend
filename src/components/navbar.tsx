import * as React from 'react';
import { Link } from 'react-router';
import { CONFIG } from '../config';
import { store } from '../store';

// TODO: Convert to ES6 class or stateless component and add a display name.
export let Navbar = React.createClass({
  links: {
    "Farm Designer" : "/dashboard/designer",
    "Controls"      : "/dashboard/controls",
    "Device"        : "/dashboard/devices",
    "Sequences"     : "/dashboard/sequences",
    "Regimens"      : "/dashboard/regimens"
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
                  let url = this.links[description];
                  return (
                          <li key={url}>
                            <Link to={url}>{description}</Link>
                          </li>
                         )
                })
              }
            </ul>
            { store.getState().bot.status }
          </div>
        </div>
      </nav>
    );
  }
});
