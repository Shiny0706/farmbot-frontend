import React from 'react';

export var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default drop-shadow" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="navbar-toggle" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li>
                <a href="/dashboard/designer">Farm Designer</a>
              </li>
              <li>
                <a href="/dashboard/controls">Controls</a>
              </li>
              <li>
                <a href="/dashboard/devices">Devices</a>
              </li>
              <li>
                <a href="/dashboard/sequences">Sequences</a>
              </li>
              <li>
                <a href="/dashboard/schedules">Schedules</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <syncbutton className="nav-status-buttons" schedules="schedules"><button className="button-like yellow" type="button"> Sync Now <i className="fa fa-upload" /> </button> <div className="last-sync">LAST SYNC: ---</div></syncbutton>
              </li>
              <li>
                <stopbutton className="nav-status-buttons"><button className="red button-like" type="button">Stop</button></stopbutton>
              </li>
              <li>
                <a href="/users/sign_out">Sign out</a>
              </li>
              <li>
                <a href="/users/edit">My Account</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
