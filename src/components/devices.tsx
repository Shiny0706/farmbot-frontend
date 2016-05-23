import * as React from "react";
import { Navbar } from "../components/nav/navbar";
import { addDevice,
         changeSettingsBuffer,
         commitSettingsChanges,
         settingToggle,
         changeDevice } from "./devices/bot_actions";
import { connect } from "react-redux";
import { convertFormToObject } from "../util.ts";
import { ToggleButton } from "./toggle_button";
import { devices } from "../device";

export class SettingsInputBox extends React.Component<any, any> {

  bot() {
    // Dumb hacks for impossible bugs.
    // This is probably what"s causing the bug
    return this.props.bot;
  }

  primary() {
    return this.props.bot.settingsBuffer[this.props.setting];
  }

  secondary() {
    let num = this.props.bot.hardware[this.props.setting];
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
    };
  }

  render() {
    return(
      <td>
        <input type="text"
               style={ this.style() }
               onChange={ this.change(this.props.setting, this.props.dispatch) }
               value={ this.primary() || this.secondary() || "---" } />
      </td>);
  }
}

// TODO HACK : This is the biggest refactor target in the app right now.
// Numerous issues: uses local variables instead of component state, references
// Farmbot object and Redux .bot property (redundant).
class DevicesPage extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {bot: devices.current};
  }

  changeBot(e) {
    // THIS IS THE CAUSE OF THE "STALE DATA" BUG: Fix me!
    e.preventDefault();
    let updates: any = _.object([[e.target.name, e.target.value]]); // {name: "value"}
    this.props.dispatch(changeDevice(updates));
  }

  saveBot(e) {
    // THIS IS THE CAUSE OF THE "STALE DATA" BUG: Fix me!
    e.preventDefault();
    this.props.dispatch(addDevice(convertFormToObject(e.target)));
  }

  render() {
    let bot = this.state.bot;
    let auth = this.props.auth;
    return (
      <div>
        <Navbar { ...this.props } />
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
                              <div className="widget-header">
                                <h5>DEVICE</h5>
                                <i className="fa fa-question-circle widget-help-icon">
                                  <div className="widget-help-text">This widget
                                  shows device information. Coming soon: update
                                  your FarmBot's software with one click!</div>
                                </i>
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
                                        <input name="name" onChange={ this.changeBot.bind(this) } value={ bot.name || "Fix me!"} />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>UUID</label>
                                      </td>
                                      <td colSpan={2}>
                                        <input name="uuid" onChange={ this.changeBot.bind(this) } value={ auth.bot }/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>SECURITY TOKEN</label>
                                      </td>
                                      <td colSpan={2}>
                                        <input name="token" onChange={ this.changeBot.bind(this) } value={ auth.token }/>
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
                                        <p>{ (this.props.bot.hardware || {}).ip_address}</p>
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
                                        <button className="button-like green">UPDATE TO V1.234</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>MICROCONTROLLER</label>
                                      </td>
                                      <td>
                                        <p>Version { String(this.props.bot.hardware.param_version) || "information is loading..." }</p>
                                      </td>
                                      <td>
                                        <button className="button-like green">UPDATE TO V1.234</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>RESTART FARMBOT</label>
                                      </td>
                                      <td>
                                        <p>This will restart FarmBot"s Raspberry Pi and controller software</p>
                                      </td>
                                      <td>
                                        <button type="button" className="button-like yellow">RESTART</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>SHUTDOWN FARMBOT</label>
                                      </td>
                                      <td>
                                        <p>This will shutdown FarmBot"s Raspberry Pi. To turn it back on, unplug FarmBot and plug it back in.</p>                                                                         </td>
                                      <td>
                                        <button type="button" className="button-like red">SHUTDOWN</button>
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
                                        <button type="button" className="button-like red">DELETE</button>
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
                          SAVE { Object.keys(this.props.bot.settingsBuffer).length ? "*" : "" }
                        </button>
                        <div className="widget-header">
                          <h5>Hardware</h5>
                          <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">Change settings
                            of your FarmBot hardware with the fields below.
                            Caution: Changing these settings to extreme
                            values can cause hardware malfunction. Make
                            sure to test any new settings before letting
                            your FarmBot use them unsupervised. Tip: Recalibrate
                            FarmBot after changing settings and test a few sequences
                            to verify that everything works as expected.</div>
                          </i>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <table className="plain">
                              <thead>
                                <tr>
                                  <th width="32%" />
                                  <th width="22%">
                                    <label>X AXIS</label>
                                  </th>
                                  <th width="22%">
                                    <label>Y AXIS</label>
                                  </th>
                                  <th width="22%">
                                    <label>Z AXIS</label>
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
                                    <label>CALIBRATION</label>
                                  </td>
                                  <td>
                                    <button type="button" className="button-like yellow">CALIBRATE X</button>
                                  </td>
                                  <td>
                                    <button type="button" className="button-like yellow">CALIBRATE Y</button>
                                  </td>
                                  <td>
                                    <button type="button" className="button-like yellow">CALIBRATE Z</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT ENDPOINTS</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_endpoints_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_x", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_endpoints_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_y", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_endpoints_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_endpoints_z", this.props.bot)) } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT MOTOR</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_motor_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_x", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_motor_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_y", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_invert_motor_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_invert_motor_z", this.props.bot)) } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>ALLOW NEGATIVES</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_home_up_x }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_x", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_home_up_y }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_y", this.props.bot)) } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ this.props.bot.hardware.movement_home_up_z }
                                                  toggleAction={ () => this.props.dispatch(settingToggle("movement_home_up_z", this.props.bot)) } />
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
                              <i className="fa fa-question-circle widget-help-icon">
                                <div className="widget-help-text">All messages from
                                your FarmBot are stored in these logs. Coming soon:
                                logs!</div>
                              </i>
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

export let Devices = connect(state => state)(DevicesPage);
