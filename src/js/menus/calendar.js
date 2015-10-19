import React from "react";
import { renderScheduleCreation } from './schedule_creation'
import { ToolTip } from '../menus/tooltip'

export class CalendarMenu extends React.Component {
  render() {
    return  <div className="search-box-wrapper purple-content">
              <input className="search" placeholder="Search"/>
            </div>;
  }
};

export class CalendarContent extends React.Component {
  render() {
    var events = _(scheduledEvents)
                   .sortBy('time')
                   .map((s, k) => <ScheduleEventView scheduledEvent={s} key={k}/>)
                   .value();
    return (
      <div className="calendar">
        <div className="widget-wrapper">
          <div className="row">
            <div className="small-12 columns">
              <div className="header-wrapper">
                <h5>Calendar</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="small-12 columns">
              <div className="content-wrapper calendar-wrapper">
                <div className="row date-flipper">
                  <div className="small-2 columns">
                    <i className="fa fa-arrow-left arrow-button radius"></i>
                  </div>
                  <div className="small-8 columns">
                    <h6 className="date">Feb 28</h6>
                  </div>
                  <div className="small-2 columns">
                    <i className="fa fa-arrow-right arrow-button radius right"></i>
                  </div>
                </div>
                { events }
              </div>
            </div>
          </div>
        </div>
        <ToolTip action={ renderScheduleCreation } desc="Schedule new event" color="dark-purple"/>
      </div>);
  }
};

export class ScheduledEvent {
  constructor (options) {
    this.time = (options.time || new Date());
    this.desc = (options.desc || "Untitled Event");
    this.icon = (options.icon || "fi-trees");
  }

  formatTime() {
    var hours = this.time.getHours();
    return `${hours} ${(hours > 12) ? "AM" : "PM"}`;
  }

  hasPassed () { return this.time < new Date(); }
};

export var scheduledEvents = [
  (new ScheduledEvent({desc: "Photograph",
                          time: new Date("02-28-2015 06:00")})),
  (new ScheduledEvent({desc: "Weed Crops",
                          time: new Date("02-28-2015 07:00")})),
  (new ScheduledEvent({desc: "Spectral Rdg",
                          time: new Date("02-28-2015 09:00")}))
];

export class ScheduleEventView extends React.Component {
  render () {
    var evnt = this.props.scheduledEvent;


    return <div className="row event { this.hasPassed() ? 'past' : '' }">
              <div className="small-12 columns">
                <div className="event-time">
                  { evnt.formatTime() }
                </div>
                <i className="event-icon fi-camera"></i>
                <div className="event-title">{ evnt.desc }</div>
                <i className="edit-icon fi-pencil right"></i>
              </div>
           </div>;
  }
}

export class Calendar extends React.Component {
  render () {
    return <div>
             <CalendarMenu />
             <CalendarContent />
           </div>
  }
}

export function renderCalendar() {
  React.render(<Calendar />, function(){ alert('Dispatch a show_calendar method here.') });
};
