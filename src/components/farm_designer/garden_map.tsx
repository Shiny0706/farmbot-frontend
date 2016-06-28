import * as React from "react";
// import { push } from "../../history";
import { browserHistory } from "react-router";
import { ICONS } from "./icons";
import { Everything, Plant } from "./interfaces";

interface MapPointProps extends Everything {
  plant: Plant;
  icon: string;
  selected: boolean;
}

export class MapPoint extends React.Component<MapPointProps, any> {
  select() {
    let p1 = this.props.location.query["p1"] || "PlantInfo";
    // Need to use OPENFARM SLUG, *not* UUID!
    console.dir(Object.keys(this.props.plant))
    let url = `/app/dashboard/designer?p1=${ p1 }&id=${ this.props.plant.openfarm_slug || "OOPS" }`;
    browserHistory.push(url);
  }

  render() {
    let length = this.props.designer.y_size, height = 30, width  = 30;
    return <image xlinkHref={ this.props.icon }
                  x={ this.props.plant.x - (width / 2) }
                  y={ ((-1 * this.props.plant.y) + length) - (height / 2) }
                  height={ `${ height }px` }
                  onClick={ this.select.bind(this) }
                  width={ `${width}px` } />;
  }
};

export class GardenMap extends React.Component<Everything, any> {
  plants() {
    return this
      .props
      .designer
      .plants
      .map((p, k) => {
        let isSelected = this.props.location.query["id"] === p._id;
        let icon = p.icon_url || ICONS[0];
        return <MapPoint plant={ p }
                         key={ k }
                         icon={ icon }
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

    let width = this.props.designer.x_size;
    let length = this.props.designer.y_size;

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
