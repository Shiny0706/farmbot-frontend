import * as React from "react";
import { connect } from "react-redux";
import { Navbar } from "../nav/navbar";
import { addDevice,
         changeSettingsBuffer,
         commitSettingsChanges,
         settingToggle,
         changeDevice } from "../devices/actions";
import { convertFormToObject } from "../util";
import { ToggleButton } from "../controls/toggle_button";
import { devices } from "../device";
import { BotLog } from "../devices/interfaces";
import * as moment from "moment";
import { Everything } from "../interfaces";

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
class DevicesPage extends React.Component<Everything, any> {

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
                              <button type="submit"
                                      className="button-like green widget-control">
                                SAVE { bot.dirty ? "*" : "" }
                              </button>
                              <div className="widget-header">
                                <h5>DEVICE</h5>
                                <i className="fa fa-question-circle widget-help-icon">
                                  <div className="widget-help-text">This widget
                                  shows device information. Note: not all features work.</div>
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
                                        <input name="name"
                                               onChange={ this.changeBot.bind(this) }
                                               value={ this.props.bot.account.name } />
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
                                        <p>0.0.0.0</p>
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
                                        <label>CONTROLLER</label>
                                      </td>
                                      <td>
                                        <p>
                                          farmbot-raspberry-pi-controller
                                        </p>
                                      </td>
                                      <td>
                                        <button className="button-like disabled gray">
                                          REMOTE UPDATES COMING SOON
                                        </button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>FIRMWARE</label>
                                      </td>
                                      <td>
                                        <p>
                                          Version {
                                            String(this.props.bot.hardware.param_version) || "loading"
                                          }
                                        </p>
                                      </td>
                                      <td>
                                        <button className="button-like disabled gray">
                                          REMOTE UPDATES COMING SOON
                                        </button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>RESTART FARMBOT</label>
                                      </td>
                                      <td>
                                        <p>
                                          This will restart FarmBot"s Raspberry Pi and controller software (coming soon)
                                        </p>
                                      </td>
                                      <td>
                                        <button type="button"
                                                className="button-like yellow">
                                          RESTART
                                        </button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>SHUTDOWN FARMBOT</label>
                                      </td>
                                      <td>
                                        <p>
                                          This will shutdown FarmBot"s Raspberry Pi. To turn it back on, unplug FarmBot and plug it back in. (coming soon)
                                        </p>
                                      </td>
                                      <td>
                                        <button type="button" className="button-like red">SHUTDOWN</button>
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
                            to verify that everything works as expected. Note:
                            Currently not all settings can be changed.</div>
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
                                  <SettingsInputBox setting="movement_steps_acc_dec_x"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_steps_acc_dec_y"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_steps_acc_dec_z"
                                                    {...this.props} />
                                </tr>
                                <tr>
                                  <td>
                                    <label>TIMEOUT AFTER (seconds)</label>
                                  </td>
                                  <SettingsInputBox setting="movement_timeout_x"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_timeout_y"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_timeout_z"
                                                    {...this.props} />
                                </tr>
                                <tr>
                                  <td>
                                    <label>STEPS PER MM</label>
                                  </td>
                                  <td>
                                    <input value="---" readOnly/>
                                  </td>
                                  <td>
                                    <input value="---" readOnly/>
                                  </td>
                                  <td>
                                    <input value="---" readOnly/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>LENGTH (m)</label>
                                  </td>
                                  <SettingsInputBox setting="movement_axis_nr_steps_x"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_axis_nr_steps_y"
                                                    {...this.props} />
                                  <SettingsInputBox setting="movement_axis_nr_steps_z"
                                                    {...this.props} />
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
                                your FarmBot are shown in these logs. Note: these
                                are not currently saved anywhere so if you refresh
                                the app this table will be cleared.</div>
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
                                <Logs logs={ this.props.bot.logQueue } />
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

interface LogsProps {
  logs: BotLog[];
}

function Logs({logs}: LogsProps) {
  function HasLogs(_) {
    function displayTime(t: number): string {
      return moment.unix(t).format("D MMM h:mma");
    }

    function displayCoordinates(log: BotLog) {
      // Stringify coords bcuz 0 is falsy in JS.
      let [x, y, z] = [log.status.X, log.status.Y, log.status.Z].map((i) => String(i));
      if (x && y && z) {
        return `${x}, ${y}, ${z}`;
      } else {
        return "Unknown";
      }
    }

    return <tbody>
             {
               logs.map((log, i) => <tr key={ i }>
                 <td> { displayTime(log.time) } </td>
                 <td> { log.data } </td>
                 <td> { displayCoordinates(log) } </td>
               </tr>)
              }
           </tbody>;
  }

  function NoLogs(props) {
    return <tbody>
            <tr>
              <td colSpan={3}>
                <p>No logs yet.</p>
              </td>
            </tr>
           </tbody>;
  }
  return (logs.length ? <HasLogs logs={ logs }/> : <NoLogs />) ;
}

export let Devices = connect(state => state)(DevicesPage);
