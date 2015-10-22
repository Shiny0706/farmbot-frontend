import React from 'react';
import Rlite from 'rlite-router';
import { store } from './redux/store';
import { ComponentLocator } from './component_locator';

export var Router = Rlite();

Router.Component = React.createClass({
  render: function() {
    var currentScreen = ComponentLocator(this.props.route.screen);
    return(
      <div>
        { React.createElement(currentScreen, this.props) }
      </div>
    );
  }
});

Router.add('', defaultRouteHandler);
Router.add('s/:screen', defaultRouteHandler);

Router.bootstrap = function(){
  window.addEventListener('hashchange', this.processHash);
}

Router.processHash = function() {
  var hash = location.hash || '#';
  Router.run(hash.slice(1)) || console.warn('Unknown route');
}

function defaultRouteHandler (r) {
  store.dispatch({type: 'ROUTE_CHANGE', payload: r});
};
