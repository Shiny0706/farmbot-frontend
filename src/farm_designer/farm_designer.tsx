import * as React from "react";
import { Navbar } from "../nav/navbar";
import { Panel1 } from "./panel_1";
import { GardenMap } from "./garden_map";
import { Panel2 } from "./panel_2";
import { fetchPlants } from "./actions";
import { connect } from "react-redux";
import { Everything } from "../interfaces";

class FarmDesignerPage extends React.Component<Everything, any> {

  componentDidMount() {
    let baseUrl = this.props.auth.iss;
    this.props.dispatch(fetchPlants(baseUrl));
  }

  render() {
    return (
        <div className="farm-designer">
        <Navbar { ...this.props } />
            <div className="farm-designer-body">
            <div className="farm-designer-left">
              <Panel1 { ...this.props } />
            </div>

            <div className="farm-designer-map">
              <GardenMap {...this.props}/>
            </div>

            <div className="farm-designer-right">
              <Panel2 { ...this.props } />
            </div>
          </div>
        </div>
    );
  }
}

export let FarmDesigner = connect(state => state)(FarmDesignerPage);
