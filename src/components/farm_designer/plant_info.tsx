import * as React from "react";
import { BackArrow } from "./back_arrow";
import { getParam } from "../../util.ts";
import { destroyPlant } from "./actions";
import { Plant as NewPlant } from "./plant";
import { Plant } from "./interfaces";

export class PlantInfo extends React.Component<any, any> {
  removePlant() {
    let url = this.props.auth.iss;
    let token = this.props.auth.token;
    this.props.dispatch(destroyPlant(this.plant, url, token));
  }

  get plant(): Plant {
    let plants = this.props.designer.plants;
    var p: any  = _(plants).find({ _id: getParam("id") }) || NewPlant({name: "Deleted plant"});
    return p;
  }

  render() {
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow/>{this.plant.name || "Plant" } { this.plant._id || "" }
        </p>
      </div>
      <div className="panel-content">
        <label>Photos of this Plant</label>
        <img className="crop-drag-info-image"
          src={this.plant.imgUrl || "http://placehold.it/200x150"} />
        <label>Plant Info</label>
        <span><a href="#">Edit</a></span>
        <ul>
          <li> Expected height: 28 inches </li>
          <li> Expected diameter: 44 inches </li>
          <li> Life Expectancy: 8 years </li>
        </ul>
        <label>Planting Tips</label>
        <span><a href="#">Edit</a></span>
        <ul>
          <li> Plant in full sun </li>
          <li> Fruits most in acidic soil </li>
          <li> Plant near melons </li>
        </ul>
        <label>Default Regimens</label>
        <span><a href="#">Edit</a></span>
        <ul>
          <li> Blueberries by OpenFarm</li>
          <li> Soil Acidifier </li>
        </ul>
        <label>Delete This Plant</label>
        <p>
          Note: You will no longer be able to plant this plant.
        </p>
        <span>
          <button className="red button-like left" onClick={this.removePlant.bind(this) }>
            Delete
          </button>
        </span>
      </div>
    </div>;

  }
}
