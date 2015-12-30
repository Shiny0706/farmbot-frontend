import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as assets from './assets';
import { createHistory } from 'history'
import { syncReduxAndRouter, pushPath } from 'redux-simple-router'
import { IndexRedirect, IndexRoute, Route, Router } from 'react-router';
import App from './routes/app';
import Dashboard from './routes/dashboard/dashboard';
import { Controls } from './routes/dashboard/controls';
import { Devices } from './routes/dashboard/devices';
import { Sequences } from './routes/dashboard/sequences/sequences';
import { Regimens } from './routes/dashboard/regimens/regimen_builder';
import { Schedules } from './routes/dashboard/schedules/schedules';
import { FarmDesigner } from './routes/dashboard/farm_designer/farm_designer';
import { Login } from './routes/login';
import { CONFIG } from './config';
import { connect } from 'react-redux';
import { error } from './logger';

import { store } from './store';

const history = createHistory();

syncReduxAndRouter(history, store);

var wrap = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(pushPath(CONFIG.ROOT_PATH + 'login'));
  }

  requireAuth(nextState, replaceState){
    var auth = {...this.props.auth};
    var that = this;
    var attemptedURL = nextState.location.pathname;
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

var ConnectedRoot = connect(state => state)(Root);
// var ConnectedRoot = connect()(Root);
ReactDOM.render(<ConnectedRoot store={ store } />,
                document.getElementById('root'));



