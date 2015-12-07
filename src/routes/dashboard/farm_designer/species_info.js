import React from 'react';
import { Plant } from '../../../models/plant';
import { fromScreenToGarden } from '../../../geometry/coordinates'
import { addPlant } from '../../../actions/plant_actions';
import { BackArrow } from './back_arrow';

export class SpeciesInfo extends React.Component {
  drop (e) {
    var box = document
      .querySelector('#drop-area > svg > rect')
      .getBoundingClientRect();
    var coords = fromScreenToGarden(e.pageX, e.pageY, box.left, box.bottom)
    var plant = new Plant(coords);
    this.props.dispatch(addPlant(plant));
  }

  render() {
    var query = {_id: this.props.location.query.id};
    var all = this.props.global.species;
    // TODO REAL ERROR HANDLER ZOMG
    var specimen = _(all).find(query) || (function(){ alert("Invalid plant id")})();
    return  <div className="panel-container green-panel">
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
                <div>
                  <label>
                    Plant Info
                    <span><a href="#">Edit</a></span>
                  </label>
                  <ul>
                    <li> Expected height: 28 inches </li>
                    <li> Expected diameter: 44 inches </li>
                    <li> Life Expectancy: 8 years </li>
                  </ul>
                </div>
                <div>
                  <label>
                    Planting Tips
                    <span><a href="#">Edit</a></span>
                  </label>
                  <ul>
                    <li> Plant in full sun </li>
                    <li> Fruits most in acidic soil </li>
                    <li> Plant near melons </li>
                  </ul>
                </div>
                <div>
                  <label>
                    Default Regimens
                    <span><a href="#">Edit</a></span>
                  </label>
                  <ul>
                    <li> Blueberries by OpenFarm</li>
                    <li> Soil Acidifier </li>
                  </ul>
                </div>
                <div>
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
