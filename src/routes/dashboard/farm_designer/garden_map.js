import React from 'react';
import { Plant } from '../../../models/plant';

export class MapPoint extends React.Component {
  select() {
    // SVG elements can't have an href= attr, so we need to jump through hoops.
    window.location.href = Plant.designerUrl(this.props.plant);
  }

  selected() {
    return (!!this.props.selected);
  }

  render() {
    var length = this.props.planting_area.length;
    var fill = this.selected() ? "red" : "black";
    return <circle cx={ this.props.plant.x }
                   cy={ (-1 * this.props.plant.y) + length - 30 }
                   onClick={ this.select.bind(this) }
                   fill={ fill }
                   r="5" />;
  }
};

export class GardenMap extends React.Component {
  plants() {
    return this.props.plants.all.map(
      function (p, k) {
        var selected = (this.props.location.query.selected_plant_id === p._id);
        return <MapPoint plant={ p }
                  key={ k }
                  planting_area={ this.props.planting_area }
                  selected={ selected }
                  dispatch={ this.props.dispatch }/>
      }.bind(this)
    );
  }

  render() {
    var style = {
      fill:        'rgba(0,0,0,0.05)',
      strokeWidth: 5,
      stroke:      'rgba(0,0,0,0.15)'
    }
    var {width, length} = this.props.planting_area;

    return <div>
             <div className="drop-area" id="drop-area" style={ {marginLeft: '10px', marginTop: '10px'} }>
              <svg width={ width }
                   height={ length } >
                <rect width={ width }
                      height={ length }
                      style={ style } />
                { this.plants() }
              </svg>
             </div>
           </div>;
  }
}
