import React from 'react';
import { renderScheduleCreation } from './schedule_creation'
import { ToolTip } from '../../../components/tooltip'
import { Schedule } from '../../../models/schedule'

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

    return <div>
             <div className="search-box-wrapper purple-content">
              <input className="search" placeholder="Search"/>
             </div>
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
               <ToolTip href="#s/designer?designer_right_menu=ScheduleCreation"
                        desc="Schedule new event"
                        color="dark-purple"/>
             </div>
            </div>
  }
}
