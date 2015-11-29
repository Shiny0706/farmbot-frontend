import React from "react";

export class Groups extends React.Component {
  render() {
    return(
      <div>
        <div className="object-list">
          <label>My Groups</label>
          <ul>
            <li>
              <a href="#">Lucky Cabages</a>
              <p>18 Plants</p>
            </li>
            <li>
              <a href="#">Sandwich Sprouts</a>
              <p>142 Plants</p>
            </li>
          </ul>
        </div>
        <div className="object-list">
          <label>Zone Auto-Groups</label>
          <ul>
            <li>
              <a href="#">Plants in Broccoli Overlord</a>
              <p>459 Plants</p>
            </li>
            <li>
              <a href="#">Plants in Flower Patch</a>
              <p>22 Plants</p>
            </li>
          </ul>
        </div>
        <div className="object-list">
          <label>Crop Auto-Groups</label>
          <ul>
            <li>
              <a href="#">All Strawberries</a>
              <p>13 Plants</p>
            </li>
            <li>
              <a href="#">All Flowers</a>
              <p>68 Plants</p>
            </li>
          </ul>
        </div>
        <div className="plus-button add-group" data-toggle="tooltip" title="Add group" href="/dashboard/designer?left_tab=AddGroup">
          <i className="fa fa-2x fa-plus" />
        </div>
      </div>
    )
  }
};
