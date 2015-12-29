import { compose, createStore } from 'redux';
import middleware from './middleware';
import reducers from './reducers';

export default function configureStore() {
  return compose(middleware)(createStore)(reducers);
}
