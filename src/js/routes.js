import React from 'react';
import { Router, Route } from 'react-router';
import FarmDesigner from './farm_designer';

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'NoMatch';
  }

  render() {
    return <div>Page Not Found?</div>;
  }
}

React.render(
  <Router>
    <Route path="/" component={ FarmDesigner }>
      <Route path="*" component={ NoMatch }/>
    </Route>
  </Router>, document.body)
