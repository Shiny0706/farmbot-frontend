import React from 'react';
import { Navbar } from '../../components/navbar';
import { addDevice } from '../../actions/bot_actions';
import { connect } from 'react-redux';
import { convertFormToObject } from '../../util.js';
import { fetchDevice, changeDevice } from '../../actions/bot_actions';
import { store } from '../../index';

var bot; // So bad... Why doesn't this page work? :(

class ToggleButton extends React.Component {
  caption() {
    var captions = {
      "0":     "no",
      "false": "no",
      "1":     "yes",
      "true":  "yes",
    }

    return captions[String(this.props.toggleval)] || "---"
  }

  css() {
    var redCSS    = "button-like red";
    var greenCSS  = "button-like green";
    var yellowCSS = "button-like yellow";

    var cssClasses = {
      "0":     redCSS,
      "false": redCSS,
      "1":     greenCSS,
      "true":  greenCSS,
    }

    return cssClasses[String(this.props.toggleval)] || yellowCSS;
  }

  render() {
    return <button className={ this.css() }> { this.caption() }</button>
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
                                        <p>Ethernet</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>IP ADDRESS</label>
                                      </td>
                                      <td colSpan={2}>
                                        <p>{ bot.hardware.IP_ADDRESS}</p>
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
                                        <p>Version { String(bot.hardware.PARAM_VERSION) || "information is loading." }</p>
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
                        <button className="green button-like widget-control">SAVE { bot.dirty ? "*" : "" }</button>
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
                                    <label>LENGTH (m)</label>
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>MAX SPEED (mm/s)</label>
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_MAX_SPD_X || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_MAX_SPD_Y || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_MAX_SPD_Z || "---" } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>ACCELERATE FOR (steps)</label>
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_STEPS_ACC_DEC_X || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_STEPS_ACC_DEC_Y || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_STEPS_ACC_DEC_Z || "---" } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>TIMEOUT AFTER (seconds)</label>
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_TIMEOUT_X || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_TIMEOUT_Y || "---" } />
                                  </td>
                                  <td>
                                    <input value={ bot.hardware.MOVEMENT_TIMEOUT_Z || "---" } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>STEPS PER MM</label>
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                  <td>
                                    <input value={ "---" } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT ENDPOINTS</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_ENDPOINTS_X } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_ENDPOINTS_Y } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_ENDPOINTS_Z } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT MOTOR</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_MOTOR_X } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_MOTOR_X } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_INVERT_MOTOR_X } />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>NEGATIVES</label>
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_HOME_UP_X } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_HOME_UP_Y } />
                                  </td>
                                  <td>
                                    <ToggleButton toggleval={ bot.hardware.MOVEMENT_HOME_UP_Z } />
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
                              {/* ngIf: logs.length > 1 */}
                              {/* ngIf: logs.length < 1 */}<tbody>
                                <tr>
                                  <td colSpan={3}>
                                    <p>We cant find any logs. Are your FarmBot device credentials correct?</p>
                                  </td>
                                </tr>
                              </tbody>{/* end ngIf: logs.length < 1 */}
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
