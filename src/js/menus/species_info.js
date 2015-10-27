import React from 'react';
import { Plant } from '../models/plant';
import { fromScreenToGarden } from '../geometry/coordinates';

export class SpeciesInfo extends React.Component {
  drop (e) {
    var box = document
      .querySelector('#drop-area > svg > rect')
      .getBoundingClientRect();
    var coords = fromScreenToGarden(e.pageX, e.pageY, box.left, box.bottom)
    var plant = new Plant(coords);
    this.props.dispatch({type: "PLANT_ADD_REQUEST", payload: plant});
  }

  render() {
    var specimen = _(this.props.global.species).
      find({_id: this.props.route.selected_specimen_id}) || {};

    return  <div>
              <div className="green-content">
                <div className="search-box-wrapper">
                  <p>
                    <a href="#s/designer?designer_left_menu=SpeciesCatalog">
                      <i className="fa fa-arrow-left"></i>
                    </a>
                    { specimen.name }
                  </p>
                </div>
              </div>
              <div className="designer-info">
                <div className="crop-drag-info-tile">
                  <h6>Species Image</h6>
                  <img className="crop-drag-info-image"
                       src={ specimen.imgUrl }
                       onDragEnd={ this.drop.bind(this) }/>
                  <div className="crop-info-overlay">
                    To plant, drag and drop into map
                  </div>
                </div>
                <div>
                  <h6>
                    Plant Info
                    <span><a href="#">Edit</a></span>
                  </h6>
                  <ul>
                    <li> Expected height: 28 inches </li>
                    <li> Expected diameter: 44 inches </li>
                    <li> Life Expectancy: 8 years </li>
                  </ul>
                </div>
                <div>
                  <h6>
                    Planting Tips
                    <span><a href="#">Edit</a></span>
                  </h6>
                  <ul>
                    <li> Plant in full sun </li>
                    <li> Fruits most in acidic soil </li>
                    <li> Plant near melons </li>
                  </ul>
                </div>
                <div>
                  <h6>
                    Default Regimens
                    <span><a href="#">Edit</a></span>
                  </h6>
                  <ul>
                    <li> Blueberries by OpenFarm</li>
                    <li> Soil Acidifier </li>
                  </ul>
                </div>
                <div>
                  <h6>
                    Delete This Crop
                  </h6>
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
