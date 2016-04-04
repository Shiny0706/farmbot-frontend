import * as React from "react";

// The default template for the whole app. We're not doing much with it.
// TODO: Maybe put the navbar in here?
export default class App extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
