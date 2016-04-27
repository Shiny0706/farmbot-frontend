import * as React from "react";
import { Link } from "react-router";
// Import all of the Events panel views
import { Events } from "./events";
import { AddEvent } from "./add_event";
import { getParam } from "../../util.ts";

// Dynamically determine what to render in the designer's second panel
// based on the value of hash fragment 'p2'
export class Panel2 extends React.Component<any, any> {
  get tabName() {
    return (getParam("p2") || "Events");
  }

  get content() {
    let component = {Events, AddEvent}[this.tabName];
    return React.createElement(component, this.props);
  }

  render() {
    return (
      <div>
        { this.content }
      </div>
    );
  }
};
