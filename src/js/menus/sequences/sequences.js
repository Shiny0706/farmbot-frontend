import React from 'react';
import { Navbar } from '../navbar';

export var Sequences = React.createClass({
  render: function() {
    return (
      <div className="farm-designer">
        <Navbar/>
        <div ng-view className="ng-scope">
          <div className="row ng-scope">
            <div className="col-md-4 col-sm-12">
              <div>
                <div className="widget-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="header-wrapper">
                        <h5>Basic Operations</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="content-wrapper">
                        <div className="row">
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left blue-block no-radius block" ng-click="addStep('move_absolute')">
                              MOVE ABSOLUTE
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left green-block no-radius block" ng-click="addStep('move_relative')">
                              MOVE RELATIVE
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left orange-block no-radius block" ng-click="addStep('pin_write')">
                              WRITE PIN
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left gray-block no-radius block" ng-click="addStep('wait')">
                              WAIT
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left red-block no-radius block" ng-click="addStep('send_message')">
                              SEND MESSAGE
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left pink-block no-radius block" ng-click="addStep('if_statement')">
                              IF STATEMENT
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left purple-block no-radius block" ng-click="addStep('move_relative')">
                              TAKE PICTURE*
                              <i className="fa fa-bars right" />
                            </button>
                          </div>
                          <div className="col-sm-6 col-md-6">
                            <button className="full-width text-left yellow-block no-radius block" ng-click="addStep('read_pin')">
                              READ PIN
                              <i className="fa fa-bars right" />
                            </button>
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
                      <div className="header-wrapper">
                        <button className="green button-like text-left" ng-click="addSequence()" style={{marginTop: '-3px'}}>
                          <i className="step fi-plus size-12" />
                          Add
                        </button>
                        <h5>Sequences</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="content-wrapper">
                        {/* ngRepeat: seq in storedSequences track by $id(seq) */}<div ng-repeat="seq in storedSequences track by $id(seq)" className="ng-scope">
                          <button className="block full-width no-radius text-left purple-block" ng-click="load(seq)">
                            Untitled Sequence
                            <i className="fa fa-bars right" />
                            <i className="fa fa-pencil right edit-icon" />
                          </button>
                        </div>{/* end ngRepeat: seq in storedSequences track by $id(seq) */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div>
                <div className="widget-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="green button-like" ng-click="saveSequence(sequence)" style={{marginTop: 5, marginRight: 15}}>
                        Save
                      </button>
                      <button className="yellow button-like" ng-click="execute(sequence)" style={{marginTop: 5, marginRight: 15}}>
                        Execute
                      </button>
                      <button className="red button-like" ng-click="deleteSequence(sequence)" style={{marginTop: 5, marginRight: 15}}>
                        Delete
                      </button>
                      <div className="header-wrapper">
                        <h5>Sequence Builder</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="content-wrapper">
                        <div className="row">
                          <div className="col-sm-12">
                            <input id="right-label" ng-model="sequence.name" type="text" className="ng-pristine ng-untouched ng-valid" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <label>Sequence Parameters:</label>
                            <a className="tiny expand button round dark-gray" href="#">PLANT-ID/PLANT-GROUP-ID</a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="drag-drop-area padding">
                              <h6>DRAG BASIC OPERATIONS AND/OR SAVE SEQUENCES HERE</h6>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div as-sortable="dragControlListeners" className="col-sm-12 ng-pristine ng-untouched ng-valid" ng-model="sequence.steps">
                            {/* ngRepeat: step in sequence.steps | orderBy: 'position' */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-12 columns">
                            <div className="drag-drop-area padding">DRAG AND DROP BASIC OPERATIONS AND SEQUENCES HERE</div>
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
});
