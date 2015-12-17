import _ from 'lodash';
import React from "react";
import { Navbar } from '../../../components/navbar';
import { Panel1 } from './panel_1';
import { GardenMap } from './garden_map';
import { Panel2 } from './panel_2';
import { fetchAllPlants } from '../../../actions/plant_actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { global: state.global,
           plants: state.plants };
}

@connect(mapStateToProps)
export class FarmDesigner extends React.Component {

  componentDidMount() { this.props.dispatch(fetchAllPlants()); }

// Is there anyway to do this in one step down in the render section?
// Yes, https://facebook.github.io/react/docs/transferring-props.html
// TODO: convert it over to that ^
  renderPanel1() {
    return React.createElement(Panel1, this.props);
  }

  renderPanel2() {
    return React.createElement(Panel2, this.props);
  }

  render() {
    return (
        <div className="farm-designer">
          <Navbar/>
          <div className="farm-designer-body">
            <div className="farm-designer-left">
              { this.renderPanel1() }
            </div>

            <div className="farm-designer-map">
              <GardenMap dispatch={this.props.dispatch}
                         route={this.props.route}
                         location={this.props.location}
                         {...this.props.global}
                         plants={this.props.plants}/>
            </div>

            <div className="farm-designer-right">
              { this.renderPanel2() }
            </div>
          </div>
        </div>
    );
  }
}
