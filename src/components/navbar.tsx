import * as React from "react";
import { Link } from "react-router";
import { store } from "../store";
import { sendCommand } from "../components/devices/bot_actions";
let LogoutButton = (props) => {
  let isAuthed = store.getState().auth.authenticated;
  if (isAuthed) {
    return <a className="logout-button"
    onClick={() => {
      sessionStorage.clear();
      location.reload();
    } }>
    Log Out
    </a>;
  } else {
    return <span></span>;
  }
};

// TODO: Rick, make this real!
let SyncButton = (props) => {
  return <button className="nav-sync button-like green">
    Synced
    </button>;
};

// TODO: Rick, make this real!
let StatusTicker = (props) => {
  return <div className="status-ticker-wrapper">
      <div className="status-ticker-light" />
      <label className="status-ticker-message">FarmBot is idle</label>
    </div>;
};

// TODO: Rick, make this real!
let EStopButton = (props) => {
  return <button className="nav-e-stop button-like red"
            type="button"
            onClick={ () => this.props.dispatch(sendCommand({name: "emergencyStop" })) } >
    E-Stop
    </button>;
};

// TODO: Convert to ES6 class or stateless component and add a display name.
export let Navbar = React.createClass({
  // TODO HACK : Add CONFIG.BASE_URL instead of hardcoding /app.
  links: {
    "Farm Designer" : "/app/dashboard/designer",
    "Controls"      : "/app/dashboard/controls",
    "Device"        : "/app/dashboard/devices",
    "Sequences"     : "/app/dashboard/sequences",
    "Regimens"      : "/app/dashboard/regimens"
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
                        );
                })
              }
            </ul>
            <SyncButton { ...this.props }/>
            <StatusTicker { ...this.props }/>
            <LogoutButton { ...this.props }/>
            <EStopButton { ...this.props }/>
          </div>
        </div>
      </nav>
    );
  }
});
