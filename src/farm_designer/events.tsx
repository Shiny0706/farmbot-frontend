import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../interfaces";
import { ScheduledEvent } from "./interfaces";

/** Temp stub for now. */
const FAKE_SCHEDULES: ScheduledEvent[] = [{
  time: new Date("02-27-2015 06:00"),
  desc: "Photos",
  icon: "fa-trees"
}, {
  time: new Date("02-28-2015 07:00"),
  desc: "Weeding",
  icon: "fa-trees"
}, {
  time: new Date("02-28-2015 09:00"),
  desc: "Spectral blah this is a long event title",
  icon: "fa-trees"
}];

interface ScheduledEventProps {
  scheduledEvent: ScheduledEvent;
}

export class ScheduleEvent extends React.Component<ScheduledEventProps, {}> {

  hasPassed(date: Date) { return date < new Date(); }

  formatTime(date: Date) {
    let hours = date.getHours();
    return `${hours} ${(hours > 12) ? "a" : "p"}`;
  }

  render() {
    let evnt = this.props.scheduledEvent;

    return <div className="event { this.hasPassed(event.time) ? 'past' : '' }">
      <div className="event-time">
        { this.formatTime(evnt.time) }
      </div>
      <div className="event-title">{evnt.desc}</div>
    </div>;
  }
}

export class Events extends React.Component<Everything, {}> {
  render() {
    let events = _(FAKE_SCHEDULES)
      .sortBy("time")
      .map((s, k) => <ScheduleEvent scheduledEvent={s} key={k}/>)
      .value();

    return <div className="panel-container magenta-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title hidden-xs events-title">
          Events
        </p>
        <div className="main-nav-button">
          <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
            <span className="glyphicon glyphicon-menu-hamburger" />
          </button>
        </div>
        <div className="panel-tabs hidden-sm hidden-md hidden-lg">
          <ul>
            <li>
              <Link to={"/app/dashboard/designer?p1=NoTab"}>Designer</Link>
            </li>
            <li>
              <Link to={"/app/dashboard/designer?p1=Plants"}>Plants</Link>
            </li>
            <li>
              <Link to={"/app/dashboard/designer?p1=Groups"}>Groups</Link>
            </li>
            <li>
              <Link to={"/app/dashboard/designer?p1=Zones"}>Zones</Link>
            </li>
            <li>
              <Link to={"/app/dashboard/designer?p1=Panel2"} className={"active"}>Calendar</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel-content">
        <div className="search-box-wrapper">
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search"/>
          <div className="search-underline"></div>
        </div>
        <div className="event-date">May 9</div>
        {events}
        <div className="event-date">OCT 15</div>
        {events}
        <Link to="/app/dashboard/designer?p2=AddEvent">
          <div className="plus-button add-event button-like" data-toggle="tooltip" title="Add event">
            <i className="fa fa-2x fa-plus" />
          </div>
        </Link>
      </div>
    </div>;
  }
}
