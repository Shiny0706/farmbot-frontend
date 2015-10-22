import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';
import { FarmDesigner } from './menus/farm_designer'

function mapDispatchToProps (d) {
  return {dispatch: d};
}

// var ConnectedApp = connect(s => s, mapDispatchToProps)(FarmDesigner);
var ConnectedApp = connect(s => s, mapDispatchToProps)(FarmDesigner);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FarmDesigner';
  }

  render() {
    return <Provider store={store}>
        {() => <ConnectedApp />}
      </Provider>;
  }
}

export default App;
