import React from 'react';
import Rlite from 'rlite-router';
import { store } from './redux/store';
import { ComponentLocator } from './component_locator';
import $ from 'jquery';

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

// PROBLEM: You only want to change one of the hash fragments properties, and
// don't want to blow away all the other parts of the hash fragment.
// Eg: Current hash: #/?bunch=of&stuff=true.
//     Current link: #/?new_item=yes
//     Desired hash: #/?bunch=of&stuff=true&new_item=yes
// SOLUTION: Silence callbacks, merge hashes, resume callbacks.
Router.silentUpdate = function (newHash) {
  Router.unbootstrap();
  location.hash = '#/?' + $.param(newHash)
  Router.bootstrap();
};

Router.bootstrap = function(){
  window.addEventListener('hashchange', this.processHash);
}
Router.unbootstrap = function(){
  window.removeEventListener('hashchange', this.processHash);
}

Router.processHash = function() {
  var hash = location.hash || '#';
  Router.run(hash.slice(1)) || console.warn('Unknown route');
}

function defaultRouteHandler (r) {
  store.dispatch({type: 'ROUTE_CHANGE', payload: r});
};
