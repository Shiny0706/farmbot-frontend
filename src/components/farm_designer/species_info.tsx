import * as React from "react";
import { savePlant } from "./actions";
import { BackArrow } from "./back_arrow";
import { Specimen } from "./interfaces";
import { Plant } from "./plant";

export class SpeciesInfo extends React.Component<any, any> {
  drop(e) {
    let box = document
      .querySelector("#drop-area > svg > rect")
      .getBoundingClientRect();
    let coords = fromScreenToGarden(e.pageX, e.pageY, box.left, box.bottom)
    let plant = Plant(coords);
    this.props.dispatch(savePlant(plant, "CHANGE_THIS_PLZ", "CHANGE_THIS_TOO!!"));
  }

  render() {
    // let query = { _id: getParam("id") };
    // TEMP FIX:
    let all: Specimen[] = [{
      name: "Placeholder", _id: "123", imgUrl: "http://placehold.it/200x150"
    }]; // this.props.global.species;
    // TODO REAL ERROR HANDLER ZOMG
    let specimen: Specimen = all[0]; // _(all).find(query);
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow /> { specimen.name }
        </p>
      </div>
      <div className="panel-content">
        <div className="crop-drag-info-tile">
          <label>Species Image</label>
          <img className="crop-drag-info-image"
            src={ specimen.imgUrl }
            onDragEnd={ this.drop.bind(this) }/>
          <div className="crop-info-overlay">
            To plant, drag and drop into map
          </div>
        </div>
        <div className="object-list">
          <label>
            Plant Info
          </label>
          <span className="edit-link"><a href="#">Edit</a></span>
          <ul>
            <li>Expected height: 28 inches</li>
            <li>Expected diameter: 44 inches</li>
            <li>Life Expectancy: 8 years</li>
          </ul>
        </div>
        <div className="object-list">
          <label>
            Planting Tips
          </label>
          <span className="edit-link"><a href="#">Edit</a></span>
          <ul>
            <li>Plant in full sun</li>
            <li>Fruits most in acidic soil</li>
            <li>Plant near melons</li>
          </ul>
        </div>
        <div className="object-list">
          <label>
            Default Regimens
          </label>
          <span className="edit-link"><a href="#">Edit</a></span>
          <ul>
            <li>Blueberries by OpenFarm</li>
            <li>Soil Acidifier</li>
          </ul>
        </div>
        <div className="object-list">
          <label>
            Delete This Crop
          </label>
          <p>
            Note: You will no longer be able to plant this crop.
          </p>
          <span>
            <button className="red">
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  }
}

function fromScreenToGarden(mouseX, mouseY, boxX, boxY) {
  let rawX = mouseX - boxX;
  let rawY = boxY - mouseY;

  return { x: rawX, y: rawY };
};
