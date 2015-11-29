import React from "react";

export class Zones extends React.Component {
  render() {
    return(
      <div>
        <div className="object-list">
          <label>My Zones</label>
          <ul>
            <li>
              <a href="#">Front area</a>
              <p>18 Square Feet</p>
            </li>
            <li>
              <a href="#">Needs Compost</a>
              <p>5 Square Feet</p>
            </li>
          </ul>
        </div>
        <div className="object-list">
          <label>Auto-Zones</label>
          <ul>
            <li>
              <a href="#">Broccoli Overlord</a>
              <p>60 Square Feet</p>
            </li>
          </ul>
        </div>
        <div className="plus-button add-zone button-like" data-toggle="tooltip" title="Add zone" href="/dashboard/designer?left_tab=AddZone">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    )
  }
};
