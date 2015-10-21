import Rlite from 'rlite-router';
import { store } from './redux/store';
export var router = Rlite();

router.add('', defaultRouteHandler);
router.add('devices', defaultRouteHandler);

router.processHash = function() {
  var hash = location.hash || '#';
  router.run(hash.slice(1)) || alert('Opps.');
}

router.bootstrap = function(){
  window.addEventListener('hashchange', this.processHash);
}

function defaultRouteHandler (r) {
  store.dispatch({type: 'ROUTE_CHANGE', payload: r});
};
