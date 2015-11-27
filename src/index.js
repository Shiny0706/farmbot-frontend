import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';
import configureStore from './configureStore';
import { loadFromCdn } from './load_from_cdn';

const store = configureStore();

require("!style!css!sass!./css/FarmDesigner.scss");
require("!style!css!sass!./css/MoveWidget.scss");
require("!style!css!sass!./css/PlantsPanel.scss");
require("!style!css!sass!./css/alerts.scss");
require("!style!css!sass!./css/blocks.scss");
require("!style!css!sass!./css/buttons.scss");
require("!style!css!sass!./css/calendar.scss");
require("!style!css!sass!./css/farmbot.scss");
require("!style!css!sass!./css/inputs.scss");
require("!style!css!sass!./css/navbar.scss");
require("!style!css!sass!./css/tables.scss");
require("!style!css!sass!./css/tooltips.scss");
require("!style!css!sass!./css/widgets.scss");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "css");


class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter/>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
        </DebugPanel>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
