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
                <label>Chose a Sequence or Regimen</label>
                <select>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                <label>Starts</label>
                <div className="flex">
                  <input placeholder="Today"
                         type="text"
                         className="flex3"/>
                  <select className="flex3">
                    <option value="volvo">12:30</option>
                    <option value="saab">12:00</option>
                  </select>
                </div>
                <label>Repeats</label>
                <div className="flex">
                  <input placeholder="2"
                         type="text"
                         className="flex3"/>
                  <select className="flex3">
                    <option value="volvo">days</option>
                    <option value="saab">hours</option>
                  </select>
                  <input type="checkbox" name="wow" value="no"/>Does not repeat
                </div>
                <label>Ends</label>
                <div className="flex">
                  <input placeholder="Today"
                         type="text"
                         className="flex3"/>
                  <select className="flex3">
                    <option value="volvo">12:30</option>
                    <option value="saab">12:00</option>
                  </select>
                </div>
                <div>
                  <button className="purple-content">
                    Save
                  </button>
                </div>
              </div>
            </div>;
  }
}
