import * as React from "react";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

@connect(state => state)
export default class Dashboard extends Component<any, any> {
  render() {
    return <div className="dashboard">
        {this.props.children}
      </div>;
  }
}
