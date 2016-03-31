import * as React from 'react';
import { Component, PropTypes } from 'react';

export default class Dashboard extends Component<any, any> {
  // static propTypes = {
  //   children: PropTypes.element,
  // };

  render() {
    return <div className="dashboard">
        {this.props.children}
      </div>;
  }
}
