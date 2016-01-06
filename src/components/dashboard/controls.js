import React from 'react';
import { Navbar } from '../../components/navbar';
import { fetchDevice, sendCommand, changeStepSize } from '../../actions/bot_actions';
import { ToggleButton } from './toggle_button';
import { store } from '../../store';
import { DirectionButton } from './direction_button';
export class StepSizeSelector extends React.Component {
  cssForIndex(num) {
    var choices = this.props.choices;
    var css = "move-amount no-radius ";
    if(num === _.first(choices)) {
      css += "leftmost "
    }
    if(num === _.last(choices)) {
      css += "rightmost "
    }
    if(num === this.props.selected) {
      css += "move-amount-selected "
    }
    return css;
  }

  render() {
    return(<div className="move-amount-wrapper">
              {
                this.props.choices.map(
                  (item, inx) => <button
                              className={ this.cssForIndex(item) }
                              onClick={ () => this.props.selector(item) }
                              key={ inx } >{ item }</button>
                )
              }
            </div>)
  }
}

export class Controls extends React.Component {

  render() {
    var bot = store.getState()
      .bot || {};

    return(
      <div>
        <Navbar/>
          <div className="all-content-wrapper">
          <div ng-view className="ng-scope">
            <div className="row ng-scope">
              <div className="col-md-4 col-sm-6 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button
                          className="red button-like widget-control"
                          type="button"
                          onClick={ () => this.props.dispatch(sendCommand({name: "emergencyStop" })) } >

                          E-STOP

                        </button>
                        <div className="widget-header">
                          <h5>Move</h5>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <label className="text-center">MOVE AMOUNT (mm) Busy</label>
                          <div className="row">
                            <div className="col-sm-12">
                              <StepSizeSelector
                                choices={ [1,10,100,1000,10000] }
                                selector={ (num) => this.props.dispatch(changeStepSize(num)) }
                                selected={ bot.stepSize } />
                            </div>
                          </div>
                          <div className="row">
                            <table align="center" className="jog-table" style={{border: 0}}>
                              <tbody><tr>
                                  <td />
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="y" direction="up" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="z" direction="up" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <button
                                     className="button-like i fa fa-home arrow-button"
                                     onClick={ () => this.props.dispatch(sendCommand({name: "homeAll", speed: (bot.hardware.s || 100) })) } />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="x" direction="left" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="y" direction="down" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                  <td>
                                    <DirectionButton axis="x" direction="right" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="z" direction="down" steps={ bot.stepSize || 1000 } {...this.props} />
                                  </td>
                                </tr>
                                <tr>
                                  <td />
                                </tr>
                              </tbody></table>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>GANTRY (X)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <input className="move-input" type="text" value={ bot.hardware.x } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>CROSS-SLIDE (Y)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <input className="move-input" type="text" value={ bot.hardware.y } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>Z-AXIS (Z)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <input className="move-input" type="text" value={ bot.hardware.z } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-5 col-sm-4 col-xs-offset-7 end">
                              <button className="full-width green button-like" ng_click="manualMovement()">GO</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Tool Control</h5>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content no-bottom-padding">
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">VACUUM PUMP</label>
                            </div>
                            <div className="col-sm-6">
                              <ToggleButton toggleval={ bot.hardware.pin0 } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">WATER VALVE</label>
                            </div>
                            <div className="col-sm-6">
                              <ToggleButton toggleval={ bot.hardware.pin12 } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">LED</label>
                            </div>
                            <div className="col-sm-6">
                              <ToggleButton toggleval={ bot.hardware.pin13 } />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Camera</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <img className="padding-bottom" src="http://108.90.200.9:8080/?action=stream" style={{width: '100%', height: 'auto', paddingBottom: 0}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> < /div>
    );
  }
};
