import * as React from "react";
import { Link } from "react-router";
import { BackArrow } from "./back_arrow";

export class AddEvent extends React.Component<any, any> {
  render() {
    return  <div className="panel-container magenta-panel">
              <div className="panel-header magenta-panel">
                <p className="panel-title">
                  <BackArrow></BackArrow>Add Event
                </p>
              </div>
              <div className="panel-content">
                <label>Sequence or Regimen</label>
                <select className="sequence-regimen-selector">
                  <option value="sequence 1">Sequence 1</option>
                  <option value="sequence 2">Sequence 2</option>
                  <option value="regimen 1">Regimne 1</option>
                  <option value="regimen 2">Regimen 2</option>
                </select>
                <label>Parameters</label>
                <p className="event-parameters">Show sequence/regimen parameters</p>
                <label>Starts</label>
                <div className="row">
                  <div className="col-xs-6">
                    <input placeholder="Today"
                           type="text"
                           className="add-event-start-date"/>
                  </div>
                  <div className="col-xs-6">
                    <select className="add-event-start-time">
                      <option value="1430">2:30pm</option>
                      <option value="1700">5:00pm</option>
                    </select>
                  </div>
                </div>
                <label>Repeats Every</label>
                <div className="row">
                  <div className="col-xs-4">
                    <input placeholder="2"
                           type="text"
                           className="add-evet-repeat-frequency"/>
                  </div>
                  <div className="col-xs-8">
                    <select className="add-event-repeat-period">
                      <option value="none">Does not repeat</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                    </select>
                  </div>
                </div>
                <label>Until</label>
                <div className="row">
                  <div className="col-xs-6">
                    <input placeholder="Today"
                           type="text"
                           className="add-event-end-date"/>
                  </div>
                  <div className="col-xs-6">
                    <select className="add-event-end-time">
                      <option value="1430">2:30pm</option>
                      <option value="1700">5:00pm</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button className="magenta button-like">
                    Save
                  </button>
                </div>
              </div>
            </div>;
  }
}
