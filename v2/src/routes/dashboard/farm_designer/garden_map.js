import React from 'react';

export class MapPoint extends React.Component {
  select() {

    // SVG elements can't have an href= attr, so we need to jump through hoops.
    var baseUrl = '/dashboard/designer?' +
                  'designer_left_menu=PlantInfo&selected_plant_id=';

    window.
      location.
      href = baseUrl + this.props.plant._id;
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
      fill:        'rgb(136, 119, 102)',
      strokeWidth: 1,
      stroke:      'rgb(0,0,0)'
    }
    var {width, length} = this.props.planting_area;

    return <div>
             <div id="drop-area" style={ {marginLeft: '10px', marginTop: '10px'} }>
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
