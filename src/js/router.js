import React from 'react';
import Rlite from 'rlite-router';
import { store } from './redux/store';
export var router = Rlite();

router.add('', defaultRouteHandler);
router.add('s/:screen', defaultRouteHandler);

router.Component = React.createClass({
  componentTable: {

  },
  currentScreen: function () {
    // body...
  },
  render: function(){
    return(
      <div>
        { this.currentScreen() }
      </div>
    );
  }
})

router.bootstrap = function(){
  window.addEventListener('hashchange', this.processHash);
}

router.processHash = function() {
  var hash = location.hash || '#';
  router.run(hash.slice(1)) || console.warn('Unknown route');
}

function defaultRouteHandler (r) {
  store.dispatch({type: 'ROUTE_CHANGE', payload: r});
};
