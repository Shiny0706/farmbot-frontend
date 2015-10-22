import React from 'react';
import Rlite from 'rlite-router';
import { store } from './redux/store';
import { FarmDesigner } from './menus/farm_designer';
import { NotFound } from './menus/not_found';

export var Router = Rlite();

Router.Component = React.createClass({
  componentTable: {

  },
  renderScreen: function (name) {
    var choices = {
      'designer': FarmDesigner
    }
    var component = choices[name] || NotFound;
    return React.createElement(component, this.props);
  },
  render: function(){
    var screenName = this.props.route.screen;
    return(
      <div>
        { this.renderScreen(screenName) }
      </div>
    );
  }
})


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
