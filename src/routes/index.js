import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from './app';
import Dashboard from './dashboard/dashboard';
import { Controls } from './dashboard/controls';
import { Devices } from './dashboard/devices';
import { Sequences } from './dashboard/sequences/sequences';
import { Regimens } from './dashboard/regimens/regimen_builder';
import { Schedules } from './dashboard/schedules/schedules';
import { FarmDesigner } from './dashboard/farm_designer/farm_designer';
import { Login } from './login';

function requireAuth(){
  console.log("REQUIRING AUTH, CAP'N!! ")
}

export function whatever(history) {
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
