import React from "react";
import { CropInventory } from './crop_inventory';
import { PlantCatalog } from './plant_catalog';
import { Calendar } from './calendar';
import { CropInfo } from './crop_info';
import _ from 'lodash';

const MENU_CHOICES = {CropInventory, PlantCatalog, CropInfo}

export class DesignerMain extends React.Component {
  // Dynamically determine what to render on the left side of the designer,
  // based on the value of getStore().leftMenu.component
  renderPanel() {
    let props = _.merge({},
                        {dispatch: this.props.dispatch},
                        this.props.leftMenu);
    let component = MENU_CHOICES[props.component];
    return React.createElement(component, props);
  }
  render(){
    return (
      <div>
        <div className="row">
        <nav className="navbar navbar-default drop-shadow">
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="navbar-toggle" type="button">
                <span className="glyphicon glyphicon-menu-hamburger"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="nav navbar-nav">
                  <li>
                    <a href="/pages/farm_designer">Farm Designer</a>
                  </li>
                  <li>
                    <a href="/dashboard#/movement">Controls</a>
                  </li>
                  <li>
                    <a href="/dashboard#/devices">Devices</a>
                  </li>
                  <li>
                    <a href="/dashboard#/sequence">Sequences</a>
                  </li>
                  <li>
                    <a href="/dashboard#/schedule">Schedules</a>
                  </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                  <li>
                    <syncbutton className="nav-status-buttons" schedules="schedules"><button className="button-like yellow" type="button"> Sync Now <i className="fa fa-upload"></i> </button> <div className="last-sync">LAST SYNC: ---</div></syncbutton>
                  </li>
                  <li>
                    <button className="red button-like" type="button">Stop</button>
                  </li>
                  <li>
                    <a href="/users/sign_out">Sign out</a>
                  </li>
                  <li>
                    <a href="/users/edit">My Account</a>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
        </div>
        <div className="farm-designer-body">
          <div className="farm-designer-left">
            <div id="designer-left">
              { this.renderPanel() }
            </div>
          </div>

          <div className="farm-designer-middle">
            <div></div>
          </div>

          <div className="farm-designer-right">
            <div id="designer-right">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
