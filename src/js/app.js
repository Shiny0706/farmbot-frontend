import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';
import { Router } from './router';

function mapStateToProps (d) { return {dispatch: d}; }
var ConnectedApp = connect(s => s, mapStateToProps)(Router.Component);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FarmBotFrontend';
  }

  render() {
    return <Provider store={store}>
        {
          () => <ConnectedApp />
        }
      </Provider>;
  }
}
