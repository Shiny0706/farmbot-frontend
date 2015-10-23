import React from 'react';
import { Navbar } from './navbar';

export var Devices = React.createClass({
  render: function() {
    return (
      <div className="farm-designer">
        <Navbar/>
        <div ng-view className="ng-scope">
          <div className="row ng-scope">
            <div className="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
              <div>
                <div className="widget-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-12">
                          <button className="button-like yellow ng-binding" style={{margin: 4}}>
                            Update FarmBot
                          </button>
                          <div className="header-wrapper">
                            <h5>DEVICE</h5>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <form ng_submit="createDevice()" className="ng-pristine ng-valid ng-valid-required">
                            <fieldset>
                              <div className="row">
                                <div className="col-md-12">
                                  <label>FARMBOT NAME *</label>
                                  <input id="botname" ng_model="device.name" placeholder="Brocolli Overlord" required type="text" className="ng-pristine ng-untouched ng-valid ng-valid-required" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <label>UUID *</label>
                                  <input ng_model="device.uuid" placeholder="ad698900-2546-11e3-87fb-c560cb0ca47b" required type="text" className="ng-pristine ng-untouched ng-valid ng-valid-required" />
                                </div>
                                <div className="col-md-6">
                                  <label>SECURITY TOKEN *</label>
                                  <input ng_model="device.token" placeholder="4bbd2jm242dl5wmimbwz4rvlu77m0a4i" required type="text" className="ng-pristine ng-untouched ng-valid ng-valid-required" />
                                </div>
                              </div>
                              <div className="row">
                                <button className="button-like yellow ng-binding" style={{margin: 9}}>
                                  Update FarmBot
                                </button>
                              </div>
                            </fieldset>
                          </form>
                          <table className="plain">
                            <tbody>
                              <tr>
                                <td>
                                  <label>FARMBOT NAME</label>
                                </td>
                                <td colSpan={2}>
                                  <p>Broccoli Overlord</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>UUID</label>
                                </td>
                                <td colSpan={2}>
                                  <p>12345678-1234-1234-1234-123456789abc</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>SECURITY TOKEN</label>
                                </td>
                                <td colSpan={2}>
                                  <p>1a17aacb03981542b892ccb1gf19e13d2b980dc2</p>
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
                                  <label>POWER</label>
                                </td>
                                <td>
                                  <button className="button-like yellow left">RESTART</button>
                                  <button className="button-like red left">SHUTDOWN</button>
                                </td>
                                {/* / TODO: Make this real ^ */}
                                <td />
                                {/* / TODO: Make this real ^ */}
                              </tr>
                              <tr>
                                <td>
                                  <label>DELETE FARMBOT</label>
                                </td>
                                <td>
                                  <button className="button-like red left">DELETE</button>
                                  <p>Caution! This cannot be undone</p>
                                </td>
                                <td />
                                {/* / TODO: Make this real ^ */}
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
            <div className="col-md-5 col-sm-6 col-xs-12">
              <div>
                <div className="widget-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="yellow button-like" ng_click="updateCalibration()" style={{margin: 4}}>UPDATE FARMBOT</button>
                      {/* / TODO: Hide the save button ^ until a value in the table has been changed and needs saving. Once the user presses the button, change the text to 'UPDATING' (while the update is happening, just like the sync button). Once the update is complete, change it to 'UPDATED :checkmark:' and make it green. */}
                      <div className="header-wrapper">
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
                                  <input ng_model="device.LENGTH_X" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.LENGTH_Y" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.LENGTH_Z" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>MAX SPEED (mm/s)</label>
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_MAX_SPD_X" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_MAX_SPD_Y" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_MAX_SPD_Z" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>ACCELERATE FOR (steps)</label>
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_ACC_DEC_X" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_ACC_DEC_Y" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_ACC_DEC_Z" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>TIMEOUT AFTER (seconds)</label>
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_TIMEOUT_X" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_TIMEOUT_Y" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_TIMEOUT_Z" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>STEPS PER MM</label>
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_PER_MM_X" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_PER_MM_Y" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                                <td>
                                  <input ng_model="device.MOVEMENT_STEPS_PER_MM_Z" className="ng-pristine ng-untouched ng-valid" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>INVERT ENDPOINTS</label>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_ENDPOINTS_X"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_ENDPOINTS_Y"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_ENDPOINTS_Z"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>INVERT MOTOR</label>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_MOTOR_X"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_MOTOR_Y"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_INVERT_MOTOR_Z"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label>NEGATIVES</label>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_NEGATIVE_X"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_NEGATIVE_Y"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
                                </td>
                                <td>
                                  <calibrationbutton className="left ng-isolate-scope" toggleval="MOVEMENT_NEGATIVE_Z"><button className="button-like ng-binding red" ng-class="{red: !isTrue(), green: isTrue()}" type="button"> NO </button></calibrationbutton>
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
          <div className="row ng-scope">
            <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
              <div>
                <div className="widget-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="header-wrapper">
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
                            {/* ngIf: logs.length < 1 */}<tbody ng_if="logs.length < 1" className="ng-scope">
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
    );
  }
});
