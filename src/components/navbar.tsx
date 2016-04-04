import * as React from 'react';
import { Link } from 'react-router';
import { CONFIG } from '../config';
import { store } from '../store';

export let Navbar = React.createClass({
  links: {
    "Farm Designer" : (CONFIG.ROOT_PATH || "/") + "dashboard/designer",
    "Controls"      : (CONFIG.ROOT_PATH || "/") + "dashboard/controls",
    "Device"        : (CONFIG.ROOT_PATH || "/") + "dashboard/devices",
    "Sequences"     : (CONFIG.ROOT_PATH || "/") + "dashboard/sequences",
    "Regimens"      : (CONFIG.ROOT_PATH || "/") + "dashboard/regimens"
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
