import * as React from 'react';
import { Link } from 'react-router';
import { BackArrow } from './back_arrow';

export class AddZone extends React.Component<any, any> {
  render() {
    return  <div className="panel-container brown-panel">
              <div className="panel-header brown-panel">
                <p className="panel-title">
                  <BackArrow/>Add Zone
                </p>
              </div>
              <div className="panel-content">
                <label>Name</label>
                <input placeholder="My new zone"
                         type="text"
                         className="flex3"/>
                <label>Size</label>
                <p>Area: 18 square feet</p>
                <p>X-Length: 6 feet</p>
                <p>Y-Length: 3 feet</p>
                <p>Coordinates: (0, 0); (6, 3)</p>
                <label>12 Plants are in this Zone</label>
                <p>Select from map to add</p>
                <label>Parent-Groups</label>
                <p>Plant1 image, Plant2 image</p>
                <label>Average Soil Composition</label>
                <p>pH: 6.3</p>
                <p>Moisture: 23%</p>
                <p>Temperature: 72 F</p>
                <button className="button-like brown">
                  Save
                </button>
              </div>
            </div>
  }
}
