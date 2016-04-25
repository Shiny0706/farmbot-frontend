import * as React from 'react';
import { Plant } from '../../models/plant';
import { navigateSelectedPlant } from '../../actions/router_actions';
import { getParam } from '../../util.ts';

export class MapPoint extends React.Component<any, any> {
  select() {
    this.props.dispatch(navigateSelectedPlant(this.props.plant));
  }

  selected() {
    return (!!this.props.selected);
  }

  render() {
    let length = this.props.global.planting_area.length;
    let fill = this.selected() ? "red" : "black";
    return <circle cx={ this.props.plant.x }
                   cy={ (-1 * this.props.plant.y) + length - 30 }
                   onClick={ this.select.bind(this) }
                   fill={ fill }
                   r="5" />;
  }
};

export class GardenMap extends React.Component<any, any> {
  plants() {
    return this.props.plants.all.map(
      function (p, k) {
        let selected = (getParam("plant") === p._id);
        return <MapPoint plant={ p }
                  key={ k }
                  { ...this.props }/>
      }.bind(this)
    );
  }

  render() {
    let style = {
      fill:        'rgba(0,0,0,0.05)',
      strokeWidth: 5,
      stroke:      'rgba(0,0,0,0.15)'
    }

    let {width, length} = this.props.global.planting_area;

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
