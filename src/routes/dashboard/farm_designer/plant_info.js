import React from 'react';
import { Plant } from '../../../models/plant'
import { Link } from 'react-router';
import { BackArrow } from './back_arrow';

export class PlantInfo extends React.Component {
  removePlant() {
   this.props.dispatch({type: "PLANT_REMOVE_REQUEST",
                        payload: this.plant });
  }

  get plant() {
    return _(this.props.plants.all)
             .find({_id: this.props.route.plant}) || {};

  }

  render() {
    return <div className="panel-container green-panel">
            <div className="panel-header green-panel">
              <p className="panel-title">
                <BackArrow/>Plant { this.plant._id || "" }
              </p>
            </div>
            <div className="plant-info">
              <div className="crop-drag-info-tile">
                <label>Photos of this Plant</label>
                <img className="plant-image"
                     src={this.plant.imgUrl || '/img/placeholder_berries.jpg'} />
                </div>
              </div>
              <div>
                <label>Plant Info</label>
                <span><a href="#">Edit</a></span>
                <ul>
                  <li> Expected height: 28 inches </li>
                  <li> Expected diameter: 44 inches </li>
                  <li> Life Expectancy: 8 years </li>
                </ul>
              </div>
              <div>
                <label>Planting Tips</label>
                  <span><a href="#">Edit</a></span>
                <ul>
                  <li> Plant in full sun </li>
                  <li> Fruits most in acidic soil </li>
                  <li> Plant near melons </li>
                </ul>
              </div>
              <div>
                <label>Default Regimens</label>
                  <span><a href="#">Edit</a></span>
                <ul>
                  <li> Blueberries by OpenFarm</li>
                  <li> Soil Acidifier </li>
                </ul>
              </div>
              <div>
                <label>Delete This Plant</label>
                <p>
                  Note: You will no longer be able to plant this plant.
                </p>
                <span>
                  <button className="red button-like left" onClick={this.removePlant.bind(this)}>
                    Delete
                  </button>
                </span>
              </div>
            </div>

  }
}
