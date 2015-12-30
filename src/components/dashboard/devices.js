import React from 'react';
import { Navbar } from '../../components/navbar';
import { addDevice } from '../../actions/bot_actions';
import { connect } from 'react-redux';
import { convertFormToObject } from '../../util.js';
import { fetchDevice, CHANGE_DEVICE } from '../../actions/bot_actions';
import { store } from '../../index';

var bot; // So bad... Why doesn't this page work? :(

export class Devices extends React.Component {
  componentDidMount(){
    if (!bot.connected) { this.props.dispatch(fetchDevice()); };
  }

  changeBot(e) {
    e.preventDefault();
    var updates = _.object([[e.target.name, e.target.value]]) // {name: "value"}
    this.props.dispatch(CHANGE_DEVICE(updates));
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
                                        <p>Arduino MEGA 2560 running farmbot-arduino-firmware V1.233</p>
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
                        {/* / TODO: Hide the save button ^ until a value in the table has been changed and needs saving. Once the user presses the button, change the text to 'UPDATING' (while the update is happening, just like the sync button). Once the update is complete, change it to 'UPDATED :checkmark:' and make it green. */}
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
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>MAX SPEED (mm/s)</label>
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>ACCELERATE FOR (steps)</label>
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>TIMEOUT AFTER (seconds)</label>
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>STEPS PER MM</label>
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                  <td>
                                    <input />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT ENDPOINTS</label>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_ENDPOINTS_X"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_ENDPOINTS_Y"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_ENDPOINTS_Z"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>INVERT MOTOR</label>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_MOTOR_X"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_MOTOR_Y"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_INVERT_MOTOR_Z"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>NEGATIVES</label>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_NEGATIVE_X"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_NEGATIVE_Y"><button className="button-like red"> NO </button></calibrationbutton>
                                  </td>
                                  <td>
                                    <calibrationbutton className="left" toggleval="MOVEMENT_NEGATIVE_Z"><button className="button-like red"> NO </button></calibrationbutton>
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
