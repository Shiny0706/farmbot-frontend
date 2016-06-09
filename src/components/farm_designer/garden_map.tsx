import * as React from "react";
import { push } from "../../history";

export class MapPoint extends React.Component<any, any> {
  select() {
    let p1 = this.props.location.query.p1 || "PlantInfo";
    let url = `/app/dashboard/designer?p1=${ p1 }&id=${ this.props.plant._id }`;
    push(url);
  }

  selected() {
    let isSelected = (!!this.props.selected);
    return isSelected;
  }

  render() {
    let length = 240; // this.props.global.planting_area.length;
    let fill = this.selected() ? "red" : "black";
    return <circle cx={ this.props.plant.x }
                   cy={ (-1 * this.props.plant.y) + length }
                   onClick={ this.select.bind(this) }
                   fill={ fill }
                   r="5" />;
  }
};

export class GardenMap extends React.Component<any, any> {
  plants() {
    return this
      .props
      .designer
      .plants
      .map((p, k) => {
        let isSelected = this.props.location.query.id === p._id;
        return <MapPoint plant={ p }
                         key={ k }
                         { ...this.props }
                         selected={ isSelected } />;
      });
  }

  render() {
    let style = {
      fill:        "rgba(0,0,0,0.05)",
      strokeWidth: 5,
      stroke:      "rgba(0,0,0,0.15)"
    };

    let width = length = 240; // this.props.global.planting_area;

    return <div>
             <div className="drop-area"
                  id="drop-area"
                  style={ {marginLeft: "10px", marginTop: "10px"} }>
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
