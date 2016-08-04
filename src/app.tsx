import * as React from "react";

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
