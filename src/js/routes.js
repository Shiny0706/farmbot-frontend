import React from 'react';
import { Router, Route, Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
        return <div>App</div>;
    }
};

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)
