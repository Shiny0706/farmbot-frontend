import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from './app';
import Dashboard from './dashboard/dashboard';
import { Controls } from './dashboard/controls';
import { Devices } from './dashboard/devices';
import { Sequences } from './dashboard/sequences/sequences';
import { Regimens } from './dashboard/regimens/regimen_builder';
import { Schedules } from './dashboard/schedules/schedules';
import { FarmDesigner } from './dashboard/farm_designer/farm_designer';
import { Login } from './login'
export function getRoutes(store) {
  function requireAuth(nextState, replaceState, cb) {
    // debugger;
    setTimeout(() => {
      const { auth } = store.getState();
      if (!auth.authenticated) {
        replaceState({ nextPath: nextState.location.pathname }, '/login');
      }
      cb();
    }, 0);
  }

  return (
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth}>
        <Route path="designer" component={FarmDesigner}/>
        <Route path="controls" component={Controls}/>
        <Route path="devices" component={Devices}/>
        <Route path="sequences" component={Sequences}/>
        <Route path="regimens" component={Regimens}/>
        <Route path="schedules" component={Schedules} />
        <IndexRoute component={Controls}/>
      </Route>
      <IndexRedirect to="/dashboard"/>
    </Route>
  );
}
