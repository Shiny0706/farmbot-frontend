import React from "react";
import { Link } from 'react-router';
// Import all of the Calendar (magenta) panel views
import { Calendar } from './calendar';
import { AddEvent } from './add_event';


// Dynamically determine what to render in the designer's second panel
// based on the value of hash fragment 'p2'
export class Panel2 extends React.Component {
  get tabName() {
    return (this.props.location.query.p2 || "Calendar")
  }

  get content() {
    var component = {Calendar, AddEvent}[this.tabName];
    return React.createElement(component, this.props);
  }

  render() {
    return (
      <div>
        { this.content }
      </div>
    )
  }
};
