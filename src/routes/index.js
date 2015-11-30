import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from './App';
import Dashboard from './dashboard/Dashboard';
import { Controls } from './dashboard/controls';
import { Devices } from './dashboard/devices';
import { Sequences } from './dashboard/sequences/sequences';
import { Schedules } from './dashboard/schedules/schedules';
import { FarmDesigner } from './dashboard/farm_designer/farm_designer';

export function getRoutes(store) {
  // console.warn('Errors dealing with ReduxRouterContext Prop/Context types on ' +
  //              'the first render are currently expected.');

  return (
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard}>
        <Route path="designer" component={FarmDesigner}/>
        <Route path="controls" component={Controls}/>
        <Route path="devices" component={Devices}/>
        <Route path="sequences" component={Sequences}/>
        <Route path="schedules" component={Schedules}/>
        <IndexRoute component={Controls}/>
      </Route>
      <IndexRedirect to="/dashboard"/>
    </Route>
  );
}
