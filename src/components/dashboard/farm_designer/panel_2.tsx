import * as React from "react";
import { Link } from 'react-router';
// Import all of the Calendar (magenta) panel views
import { Calendar } from './calendar';
import { AddEvent } from './add_event';
import { getParam } from '../../../util.ts';


// Dynamically determine what to render in the designer's second panel
// based on the value of hash fragment 'p2'
export class Panel2 extends React.Component<any, any> {
  get tabName() {
    return (getParam("p2") || "Calendar")
  }

  get content() {
    let component = {Calendar, AddEvent}[this.tabName];
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
