import { compose, createStore } from 'redux';
import middleware from './middleware';
import reducers from './reducers';

function configureStore() {
  return compose(middleware)(createStore)(reducers);
}

export var store = configureStore();
