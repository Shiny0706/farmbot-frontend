import React from 'react';

export var Controls = React.createClass({
  render: function () {
    return(
    <div className="row">
      <div className="large-4 medium-6 small-12 columns large-offset-1">
        <div>
          <div className="widget-wrapper">
            <div className="row">
              <div className="small-12 columns">
                <div className="header-wrapper">
                  <h5>Move</h5>
                </div>
              </div>


              <div className="small-12 columns">
                <div className="content-wrapper">
                  <h6 className="control-title text-center">Move
                  Amount (mm) Busy</h6>


                  <div className="row">
                    <div className="small-12 columns">
                      <button className="move-amount no-radius leftmost"
                      stepsize="1">1</button> <button className=
                      "move-amount no-radius" stepsize="10">10</button>
                      <button className="move-amount no-radius" stepsize=
                      "100">100</button> <button className=
                      "move-amount no-radius rightmost move-amount-selected"
                      stepsize="1000">1000</button>
                    </div>
                  </div>


                  <div className="row">
                    <table align="center" className="transparent-table jog-table"
                    style={{border: 0}}>
                      <tbody>
                        <tr>
                          <td>
                          </td>

                          <td style={{fontStyle: "italic"}}>
                          </td>

                          <td>
                          </td>

                          <td style={{fontStyle: "italic"}}>
                          </td>
                        </tr>


                        <tr>
                          <td style={{fontStyle: "italic"}}>
                          </td>

                          <td style={{fontStyle: "italic"}}>
                          </td>

                          <td style={{fontStyle: "italic"}}>
                          </td>

                          <td style={{fontStyle: "italic"}}>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div className="row">
                    <div className="small-4 columns">
                      <div className="control-title">
                        Gantry (X)
                      </div>
                    </div>


                    <div className="small-4 columns">
                      <input className="move-input" type="text"/>
                    </div>


                    <div className="small-4 columns">
                      <button className="full-width gray button-like">HOME X</button>
                    </div>
                  </div>


                  <div className="row">
                    <div className="small-4 columns">
                      <div className="control-title">
                        Cross-Slide (Y)
                      </div>
                    </div>


                    <div className="small-4 columns">
                      <input className="move-input" type="text"/>
                    </div>


                    <div className="small-4 columns">
                      <button className="full-width gray button-like">HOME Y</button>
                    </div>
                  </div>


                  <div className="row">
                    <div className="small-4 columns">
                      <div className="control-title">
                        Z-Axis (Z)
                      </div>
                    </div>


                    <div className="small-4 columns">
                      <input className=
                      "move-input"
                      placeholder="516"
                      type="text"/>
                    </div>


                    <div className="small-4 columns">
                      <button className="full-width gray button-like">HOME Z</button>
                    </div>
                  </div>


                  <div className="row padding-bottom">
                    <div className="small-4 columns">
                      <button className="red button-like" type=
                      "button">Stop</button>
                    </div>


                    <div className="small-4 columns">
                      <button className="full-width green button-like">GO</button>
                    </div>


                    <div className="small-4 columns">
                      <button className="full-width gray button-like">HOME ALL</button>
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
              <div className="large-12 small-12 columns">
                <div className="header-wrapper">
                  <h5>Tool Control</h5>
                </div>
              </div>


              <div className="large-12 small-12 columns">
                <div className="content-wrapper">
                  <div className="row">
                    <div className="large-6 small-6 columns">
                      <label className="left inline">Vacuum Pump</label>
                    </div>


                    <div className="large-6 small-6 columns">
                      <button className=
                      "xx-small button radius red green">LOADING</button>
                    </div>
                  </div>


                  <div className="row">
                    <div className="large-6 small-6 columns">
                      <label className="left inline">Water Pump</label>
                    </div>


                    <div className="large-6 small-6 columns">
                      <button className=
                      "xx-small button radius red green">LOADING</button>
                    </div>
                  </div>


                  <div className="row">
                    <div className="large-6 small-6 columns">
                      <label className="left inline">LED</label>
                    </div>


                    <div className="large-6 small-6 columns">
                      <button className=
                      "xx-small button radius red green">LOADING</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="large-6 medium-6 small-12 columns end">
        <div>
          <div className="widget-wrapper">
            <div className="row">
              <div className="small-12 columns">
                <div className="header-wrapper">
                  <h5>Camera</h5>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="small-12 columns">
                <div className="content-wrapper">
                <img className="padding-bottom"
                src="http://108.90.200.9:8080/?action=stream"
                style={{width: '1080px', height: 'auto'}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
});
