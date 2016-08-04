import * as React from "react";
import { BackArrow } from "./back_arrow";
import { getParam } from "../util";
import { destroyPlant } from "./actions";
import { Plant as NewPlant } from "./plant";
import { Plant } from "./interfaces";
import { Everything } from "../interfaces";

export class PlantInfo extends React.Component<Everything, any> {
  removePlant() {
    let url = this.props.auth.iss;
    let token = this.props.auth.token;
    this.props.dispatch(destroyPlant(this.plant, url, token));
  }

  get plant() {
    let plants = this.props.designer.plants;
    let query = { openfarm_slug: getParam("id") };
    var p = (_(plants).find(query) || NewPlant({name: "Deleted plant"})) as Plant;
    return p;
  }

  render() {
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow/>
          { this.plant.name || "Plant" }
        </p>
      </div>
      <div className="panel-content">
        <label>Plant Info</label>
        <ul>
          <li>Started: April 17, 2016</li>
          <li>Age: 62 days</li>
          <li>Location: 580, 3,000, -12,303</li>
          <li>Est. height: 28 inches</li>
          <li>Est. diameter: 44 inches</li>
        </ul>
        <label>Regimens</label>
        <span className="edit-link"><a href="#">Edit</a></span>
        <ul>
          <li>Blueberries by OpenFarm</li>
          <li>Soil Acidifier</li>
        </ul>
        <label>Delete This Plant</label>
        <div>
          <button className="red button-like left" onClick={this.removePlant.bind(this) }>
            Delete
          </button>
        </div>
      </div>
    </div>;

  }
}
