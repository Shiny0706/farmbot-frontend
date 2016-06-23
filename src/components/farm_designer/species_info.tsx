import * as React from "react";
import { savePlant } from "./actions";
import { BackArrow } from "./back_arrow";
import { Everything } from "./interfaces";
import { Plant } from "./plant";

export class SpeciesInfo extends React.Component<Everything, any> {
  drop(e) {
    let box = document
      .querySelector("#drop-area > svg > rect")
      .getBoundingClientRect();
    let coords = fromScreenToGarden(e.pageX, e.pageY, box.left, box.bottom);
    let plant = Plant(coords);
    let baseUrl: string = this.props.auth.iss;
    let token: string = this.props.auth.token;

    // TEMPORARY SOLUTION =======
    let OFEntry = this.findCrop(this.props.location.query["id"]);
    plant.imgUrl = OFEntry.image;
    plant.openfarm_slug = OFEntry.crop.slug;
    // END TEMPORARY SOLUTION =======

    this.props.dispatch(savePlant(plant, baseUrl, token));
  }

  findCrop(slug) {
    let crops = this.props.designer.cropSearchResults;
    let crop = _(crops).find((result) => result.crop.slug === slug);
    return crop;
  }

  render() {

    let result = this.findCrop(this.props.location.query["id"]);

    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow /> { result.crop.name }
        </p>
      </div>
      <div className="panel-content">
        <div className="crop-drag-info-tile">
          <img className="crop-drag-info-image"
            src={ result.image }
            onDragEnd={ this.drop.bind(this) }/>
          <div className="crop-info-overlay">
            Drag and drop into map
          </div>
        </div>
        <div className="object-list">
          <label>
            Crop Info
          </label>
          <span className="edit-link"><a href="#">Edit</a></span>
          <ul>
            {
              _(result.crop)
                .omit(["slug", "processing_pictures"])
                .pairs()
                .map(function (pair, i) {
                  let key = pair[0] as string;
                  let value = pair[1];
                  return <li key={ i }>
                    <strong>{ _.startCase(key) + ": " }</strong>
                    { value || "Not set" }
                  </li>;
                })
                .value()
            }
          </ul>
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
