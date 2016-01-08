import React, { Component, PropTypes } from 'react';
// import Radium from 'radium';

// const styles = {
//   base: {
//     flex: 1,
//     height: '100%',
//     width: '100%',
//   },
// };

// @Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    // <div className="app" style={styles.base}>
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
