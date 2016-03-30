import * as React from "react";
import { Component } from "react";
import { Provider } from "react-redux";
import * as assets from "./assets";
import { syncReduxAndRouter, pushPath } from "redux-simple-router"
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
import _ from "lodash";

import { store } from "./store";
import { createHistory } from "history"
const history = createHistory();

syncReduxAndRouter(history, store);

let wrap = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(pushPath(CONFIG.ROOT_PATH + "login"));
  }

  requireAuth(nextState, replaceState) {
    let auth = _.assign({}, this.props.auth);
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
        <Provider store={store}>
          <Router history={history}>
            <Route path={CONFIG.ROOT_PATH || "/"} component={App}>
              <Route path="login" component={ wrap(Login, this.props) }/>
              <Route path="dashboard" component={ Dashboard } onEnter={ this.requireAuth.bind(this) }>
                <Route path="designer" component={ wrap(FarmDesigner, this.props) } onEnter={ this.requireAuth.bind(this) }/>
                <Route path="controls" component={ wrap(Controls, this.props) } onEnter={ this.requireAuth.bind(this) } />
                <Route path="devices" component={ wrap(Devices, this.props) } onEnter={ this.requireAuth.bind(this) } />
                <Route path="sequences" component={ wrap(Sequences, this.props) } onEnter={ this.requireAuth.bind(this) } />
                <Route path="regimens" component={ wrap(Regimens, this.props) } onEnter={ this.requireAuth.bind(this) } />
                <Route path="schedules" component={ wrap(Schedules, this.props) } onEnter={ this.requireAuth.bind(this) } />
                <IndexRoute component={wrap(Controls, this.props)}/>
              </Route>
              <IndexRedirect to="dashboard"/>
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}

export let RootComponent = connect(state => state)(Root);
