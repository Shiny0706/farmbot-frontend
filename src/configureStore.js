import { compose, createStore } from 'redux';
import { devTools } from 'redux-devtools';
import middleware from './middleware';
import reducers from './reducers';

export default function configureStore() {
  return compose(
    middleware,
    devTools(),
  )(createStore)(reducers);
}
