import React from 'react';
import { Navbar } from '../../components/navbar';
import { addDevice,
         changeSettingsBuffer,
         commitSettingsChanges,
         settingToggle,
         fetchDevice,
         changeDevice } from '../../actions/bot_actions';
import { connect } from 'react-redux';
import { convertFormToObject } from '../../util.js';
import { store } from '../../store';
import { ToggleButton } from './toggle_button';

var bot; // So bad... Why doesn't this page work? :(



export class SettingsInputBox extends React.Component {

  bot() {
    // Dumb hacks for impossible bugs.
    return this.props.store.getState().bot;
  }

  primary() {
    return this.bot().settingsBuffer[this.props.setting];
  }

  secondary() {
    var num = this.bot().hardware[this.props.setting];
    if (_.isNumber(num)) {
      return String(num); // Prevent 0 from being falsy.
    } else {
      return num;
    }
  }

  style() {
    return {
      border: (this.primary()) ? "1px solid red" : ""
    };
  }

  change(key, dispatch) {
    return function(event) {
      dispatch(changeSettingsBuffer(key, event.target.value));
    }
  }

  render() {
    return(
      <td>
        <input type="text"
               style={ this.style() }
               onChange={ this.change(this.props.setting, this.props.dispatch) }
               value={ this.primary() || this.secondary() || "---" } />
      </td>)

  }
}


export class Devices extends React.Component {
  changeBot(e) {
    e.preventDefault();
    var updates = _.object([[e.target.name, e.target.value]]) // {name: "value"}
    this.props.dispatch(changeDevice(updates));
  }

  saveBot(e) {
    e.preventDefault();
    this.props.dispatch(addDevice(convertFormToObject(e.target)));
  }

  render() {
    bot = this.props.store.getState().bot;
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div>
            <div className="row">
              <div className="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                      <form onSubmit={ this.saveBot.bind(this) }>
                          <div className="row">
                            <div className="col-sm-12">
                              <button type="submit" className="button-like green widget-control">SAVE { bot.dirty ? "*" : "" }</button>
                              <button type="button" className="button-like yellow widget-control">RESTART</button>
                              <button type="button" className="button-like red widget-control">SHUTDOWN</button>
                              <div className="widget-header">
                                <h5>DEVICE</h5>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="widget-content">
                                <table className="plain">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>FARMBOT NAME</label>
                                      </td>
                                      <td colSpan={2}>
                                        <input name="name" onChange={ this.changeBot.bind(this) } value={ bot.name } />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>UUID</label>
                                      </td>
                                      <td colSpan={2}>
                                        <input name="uuid" onChange={ this.changeBot.bind(this) } value={ bot.uuid }/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>SECURITY TOKEN</label>
                                      </td>
                                      <td colSpan={2}>
                                        <input name="token" onChange={ this.changeBot.bind(this) } value={ bot.token }/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>NETWORK</label>
                                      </td>
                                      <td colSpan={2}>
                                        <p>---</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>IP ADDRESS</label>
                                      </td>
                                      <td colSpan={2}>
                                        <p>{ bot.hardware.ip_address}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>MAC ADDRESS</label>
                                      </td>
                                      <td colSpan={2}>
                                        <p>00:00:00:00:00:00</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>COMPUTER</label>
                                      </td>
                                      <td>
                                        <p>Raspberry Pi 2 Model B+ running farmbot-raspberry-pi-controller V1.233</p>
                                      </td>
                                      <td>
                                        <button className="button-like yellow">UPDATE TO V1.234</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>MICROCONTROLLER</label>
                                      </td>
                                      <td>
                                        <p>Version { String(bot.hardware.param_version) || "information is loading." }</p>
                                      </td>
                                      <td>
                                        <button className="button-like yellow">UPDATE TO V1.234</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>DELETE FARMBOT</label>
                                      </td>
                                      <td>
                                        <p>Caution! This cannot be undone</p>
                                      </td>
                                      <td>
                                        <button type="button" className="button-like red">DELETE FARMBOT</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      </form>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-6 col-xs-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="green button-like widget-control"
                                onClick={ () => this.props.dispatch(commitSettingsChanges()) } >
                          SAVE { Object.keys(bot.settingsBuffer).length ? "*" : "" }
                        </button>
                        <div className="widget-header">
                          <h5>Hardware</h5>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <table className="plain">
                              <thead>
                                <tr>
                                  <th width="32%" />
                                  <th width="22%">
                                    <label>GANTRY (X)</label>
                                  </th>
                                  <th width="22%">
                                    <label>CROSS-SLIDE (Y)</label>
                                  </th>
                                  <th width="22%">
                                    <label>Z-AXIS (Z)</label>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <label>MAX SPEED (mm/s)</label>
                                  </td>
                                  <SettingsInputBox setting="movement_max_spd_x" {...this.props} />
                                  <SettingsInputBox setting="movement_max_spd_y" {...this.props} />
                                  <SettingsInputBox setting="movement_max_spd_z" {...this.props} />
                                </tr>
                                <tr>
                                  <td>
                                    <label>ACCELERATE FOR (steps)</label>
                                  </td>
                                  <SettingsInputBox setting="movement_steps_acc_dec_x" {...this.props} />
                                  <SettingsInputBox setting="movement_steps_acc_dec_y" {...this.props} />
                                  <SettingsInputBox setting="movement_steps_acc_dec_z" {...this.props} />
                                </tr>
                                <tr>
                                  <td>
                                    <label>TIMEOUT AFTER (seconds)</label>
                                  </td>
                                  <SettingsInputBox setting="movement_timeout_x" {...this.props} />
                                  <SettingsInputBox setting="movement_timeout_y" {...this.props} />
                                  <SettingsInputBox setting="movement_timeout_z" {...this.props} />
                                </tr>
                                <tr>
                                  <td>
                                    <label>STEPS PER MM</label>
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>LENGTH (m)</label>
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                  <td>
                                    <input value="---" />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT ENDPOINTS</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_endpoints_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_x")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_endpoints_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_y")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_endpoints_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_z")) } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT MOTOR</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_motor_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_x")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_motor_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_y")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_invert_motor_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_z")) } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>NEGATIVES</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_home_up_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_x")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_home_up_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_y")) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.movement_home_up_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_z")) } />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="widget-header">
                              <h5>Logs</h5>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <table>
                              <thead>
                                <tr>
                                  <th width="15%">
                                    <label>TIME</label>
                                  </th>
                                  <th width="75%">
                                    <label>MESSAGE</label>
                                  </th>
                                  <th width="10%">
                                    <label>COORDINATES</label>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan={3}>
                                    <p>We cant find any logs. Are your FarmBot device credentials correct?</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
