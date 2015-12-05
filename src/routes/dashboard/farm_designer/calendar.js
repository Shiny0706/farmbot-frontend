import React from 'react';
import { Schedule } from '../../../models/schedule'
import { Link } from 'react-router';
import { BackArrow } from './back_arrow';

export class ScheduleEvent extends React.Component {
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
    var events = _(Schedule.fakes)
                   .sortBy('time')
                   .map((s, k) => <ScheduleEvent scheduledEvent={s} key={k}/>)
                   .value();

     return <div className="panel-container magenta-panel">
              <div className="panel-header magenta-panel">
                <p className="panel-title hidden-xs">
                  Calendar
                </p>
                <div className="main-nav-button">
                  <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
                    <span className="glyphicon glyphicon-menu-hamburger" />
                  </button>
                </div>
                <div className="panel-tabs hidden-sm hidden-md hidden-lg">
                  <ul>
                    <li>
                      <Link to={ "/dashboard/designer?p1=NoTab" }>Designer</Link>
                    </li>
                    <li>
                      <Link to={ "/dashboard/designer?p1=Plants" }>Plants</Link>
                    </li>
                    <li>
                      <Link to={ "/dashboard/designer?p1=Groups" }>Groups</Link>
                    </li>
                    <li>
                      <Link to={ "/dashboard/designer?p1=Zones" }>Zones</Link>
                    </li>
                    <li>
                      <Link to={ "/dashboard/designer?p1=Panel2" } className={"active"}>Calendar</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="search-box-wrapper">
                <i className="fa fa-search"></i>
                <input className="search" placeholder="Search"/>
                <div className="search-underline"></div>
              </div>
              { events }
              <Link to="/dashboard/designer?p2=AddEvent">
                <div className="plus-button add-event button-like" data-toggle="tooltip" title="Add event">
                  <i className="fa fa-2x fa-plus" />
                </div>
              </Link>
            </div>
  }
}
