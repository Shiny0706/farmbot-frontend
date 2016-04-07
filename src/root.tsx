import "./assets"; // I'll just take the side effects, thanks.
import * as React from "react";

import {
  Provider,
  connect
} from "react-redux";

import {
  IndexRedirect,
  IndexRoute,
  Route,
  Router,
  RedirectFunction,
  RouterState,
  Link
} from "react-router";

import App from "./components/app";
import Dashboard from "./components/dashboard/dashboard";
// TODO connect() all of these instead of that wrap() stuff.
import { Controls } from "./components/dashboard/controls";
import { Devices } from "./components/dashboard/devices";
import { Sequences } from "./components/dashboard/sequences/sequences";
import { Regimens } from "./components/dashboard/regimens/regimen_builder";
import { Schedules } from "./components/dashboard/schedules/schedules";
import { FarmDesigner } from "./components/dashboard/farm_designer/farm_designer";
import { Login } from "./components/login";
import { CONFIG } from "./config";
import { store } from "./store";
import { history } from "./history";

console.log("Version 0.2.0");

export class RootComponent extends React.Component<any, any> {

  requireAuth(nextState: RouterState, replace: RedirectFunction) {
      let isAuthed = this
                      .props
                      .store
                      .getState()
                      .auth
                      .authenticated;
      if (!isAuthed) {
        console.warn("Log in first.");
        replace("/app/login");
      }
  };

  // Thanks @noahMiller and @jpierson (Github) for this wonderful fix!
  // Reference:
  //  https://github.com/reactjs/react-router/issues/2704#issuecomment-174067923
  routes = (<Route path="app" component={App}>
              <Route path="login" component={ Login }/>
              <Route path="dashboard"
                  component={ Dashboard }
                  onEnter={ this.requireAuth.bind(this) }>
                <Route path="designer"
                  component={ FarmDesigner }
                  onEnter={ this.requireAuth.bind(this) }/>
                <Route path="controls"
                  component={ Controls }
                  onEnter={ this.requireAuth.bind(this) } />
                <Route path="devices"
                  component={ Devices }
                  onEnter={ this.requireAuth.bind(this) } />
                <Route path="sequences"
                  component={ Sequences }
                  onEnter={ this.requireAuth.bind(this) } />
                <Route path="regimens"
                  component={ Regimens }
                  onEnter={ this.requireAuth.bind(this) } />
                <IndexRoute
                  component={ Controls } />
                  <IndexRedirect to="controls" />
              </Route>
              <IndexRedirect to="dashboard/controls" />
            </Route>);

  render() {
        return (<Provider store={store}>
                  <Router history={history}>
                      { this.routes }
                  </Router>
                </Provider>);
  }
}
