import _ from 'lodash';
import React from "react";
import { connect } from 'react-redux';
import { Calendar } from './calendar';
import { GardenMap } from './garden_map';
import { Navbar } from '../../../components/navbar';
import { SpeciesCatalog } from './species_catalog';
import { PlantInfo } from './plant_info';
import { SpeciesInfo } from './species_info';
import { LeftPanel } from './left_panel';
import { ScheduleCreation } from './schedule_creation';
import { fetchAllPlants } from '../../../actions/plant_actions';

const MENU_CHOICES = {LeftPanel, SpeciesCatalog,
                      PlantInfo, SpeciesInfo, Calendar, ScheduleCreation};

function mapStateToProps(state) {
  return { global: state.global,
           plants: state.plants };
}

@connect(mapStateToProps)
export class FarmDesigner extends React.Component {

  componentDidMount() { this.props.dispatch(fetchAllPlants()); }
  // Dynamically determine what to render on the left side of the designer,
  // based on the value of hash fragment left_tab
  renderPanel(selectedComponent) {
    var component = MENU_CHOICES[selectedComponent];
    if (!component) {
      var msg = `Cant render '${selectedComponent}', valid choices are:`
      var choices = Object.keys(MENU_CHOICES);
      console.warn(msg, choices);
    } else {
      return React.createElement(component, this.props);
    };
  }

  render() {
    return (
        <div className="farm-designer">
          <Navbar/>
          <div className="farm-designer-body">
            <div className="farm-designer-left">
              <div id="designer-left">
                {
                  this.renderPanel(
                    this.props.location.query.designer_left_tab || "LeftPanel"
                  )
                }
              </div>
            </div>

            <div className="farm-designer-map">
              <GardenMap dispath={this.props.dispatch}
                         route={this.props.route}
                         location={this.props.location}
                         {...this.props.global}
                         plants={this.props.plants}/>
            </div>

            <div className="farm-designer-right">
              <div id="designer-right">
                {
                  this.renderPanel(
                    this.props.location.query.designer_right_menu || "Calendar"
                  )
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}
