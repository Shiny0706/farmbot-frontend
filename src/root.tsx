import * as React from "react";
import { Component } from "react";
import { Provider } from "react-redux";
import * as assets from "./assets";
import { syncHistoryWithStore, push } from "react-router-redux"
import { IndexRedirect, IndexRoute, Route, Router } from "react-router";
import App from "./components/app";
import Dashboard from "./components/dashboard/dashboard";
import { Controls } from "./components/dashboard/controls";
import { Devices } from "./components/dashboard/devices";
import { Sequences } from "./components/dashboard/sequences/sequences";
import { Regimens } from "./components/dashboard/regimens/regimen_builder";
import { Schedules } from "./components/dashboard/schedules/schedules";
import { FarmDesigner } from "./components/dashboard/farm_designer/farm_designer";
import { Login } from "./components/login";
import { CONFIG } from "./config";
import { connect } from "react-redux";
import * as _ from "lodash";

import { store } from "./store";
import { createHistory } from "history"
const history = createHistory();

syncHistoryWithStore(history, store);

let wrap = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

class Root extends Component<any, any> {
  componentDidMount() {
    this.props.dispatch(push(CONFIG.ROOT_PATH + "login"));
  }

  requireAuth(nextState, replaceState) {
    let auth: any = _.assign({}, this.props.auth);
    let that = this;
    let attemptedURL = nextState.location.pathname;
      if (auth.authenticated) {
        return nextState; // TODO Delete this?
      } else {
        that.props.dispatch({
          type: "LOGIN_REQUIRED",
          payload: { attemptedURL }
        });
      };
  }

  render() {
    return (
      <div>
        OMG!
      </div>
    );
  }
}

export let RootComponent = connect(state => state)(Root);
