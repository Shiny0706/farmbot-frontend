import React from 'react';
import { Plant } from '../../../models/plant'
import { BackArrow } from './back_arrow';

export class PlantInfo extends React.Component {
  removePlant() {
   this.props.dispatch({type: "PLANT_REMOVE_REQUEST",
                        payload: this.plant });
  }

  get plant() {
    return _(this.props.plants.all)
             .find({_id: this.props.route.selected_plant_id}) || {};

  }

  render() {
    return <div>
            <div className="green-content">
              <div className="search-box-wrapper">
                <p>
                  <BackArrow /> Plant { this.plant._id || "" }
                </p>
              </div>
            </div>
            <div className="designer-info">
              <div className="crop-drag-info-tile">
                <h6>Photos of this Plant</h6>
                <img className="crop-drag-info-image"
                     src={this.plant.imgUrl || '/img/placeholder_berries.jpg'} />
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
                  Delete This Plant
                </h6>
                <p>
                  Note: You will no longer be able to plant this plant.
                </p>
                <span>
                  <button className="red" onClick={this.removePlant.bind(this)}>
                    Delete
                  </button>
                </span>
              </div>
            </div>

  }
}
