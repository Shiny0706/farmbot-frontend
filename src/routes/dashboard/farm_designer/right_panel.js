import React from "react";
import { Link } from 'react-router';
// Import all of the Calendar (magenta) panel views
import { Calendar } from './calendar';


// Dynamically determine what to render in the designer's right panel
// based on the value of hash fragment 'Calendar'
export class RightPanel extends React.Component {
  get tabName() {
    return (this.props.location.query.Calendar || "Calendar")
  }

  get content() {
    var component = {Calendar, }[this.tabName];
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
