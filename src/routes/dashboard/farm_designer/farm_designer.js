import _ from 'lodash';
import React from "react";
import { connect } from 'react-redux';
import { Navbar } from '../../../components/navbar';
import { LeftPanel } from './left_panel';
import { GardenMap } from './garden_map';
import { RightPanel } from './right_panel';
import { fetchAllPlants } from '../../../actions/plant_actions';

function mapStateToProps(state) {
  return { global: state.global,
           plants: state.plants };
}

@connect(mapStateToProps)
export class FarmDesigner extends React.Component {

  componentDidMount() { this.props.dispatch(fetchAllPlants()); }

// Is there anyway to do this in one step down in the render section?
  renderLeftPanel() {
    return React.createElement(LeftPanel, this.props);
  }

  renderRightPanel() {
    return React.createElement(RightPanel, this.props);
  }

  render() {
    return (
        <div className="farm-designer">
          <Navbar/>
          <div className="farm-designer-body">
            <div className="farm-designer-left">
              { this.renderLeftPanel() }
            </div>

            <div className="farm-designer-map">
              <GardenMap dispatch={this.props.dispatch}
                         route={this.props.route}
                         location={this.props.location}
                         {...this.props.global}
                         plants={this.props.plants}/>
            </div>

            <div className="farm-designer-right">
              { this.renderRightPanel() }
            </div>
          </div>
        </div>
    );
  }
}
