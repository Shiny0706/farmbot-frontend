import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';
import { DesignerMain } from './menus/designer_main'

function dispatchMapper (d) {
  return {dispatch: d};
}

var App = connect(s => s, dispatchMapper)(DesignerMain);

class FarmDesigner extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'FarmDesigner';
    }
    render() {
      return <Provider store={store}>
          {() => <App />}
        </Provider>;
    }
}

export default FarmDesigner;

