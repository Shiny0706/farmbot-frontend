import * as React from 'react';
import { Component, PropTypes } from 'react';

export default class App extends Component<any, any> {
  // static propTypes = {
  //   children: PropTypes.element,
  // };

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
