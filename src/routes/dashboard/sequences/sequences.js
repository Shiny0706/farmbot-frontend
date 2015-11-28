import React from 'react';
import { Navbar } from '../../../components/navbar';

export var Sequences = React.createClass({
  render: function() {
    return (
      <div className="farm-designer">
        <Navbar/>
        <div className="all-content-wrapper">
          <div ng-view className="ng-scope">
            <div className="row ng-scope">

              <div className="col-md-3 col-sm-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="gray button-like widget-control">
                          Add
                        </button>
                        <div className="widget-header">
                          <h5>Sequences</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <div className="block-wrapper">
                            {/* ngRepeat: seq in storedSequences track by $id(seq) */}<div ng-repeat="seq in storedSequences track by $id(seq)" className="ng-scope">
                              <button className="block full-width no-radius text-left purple-block block-header" ng-click="load(seq)">
                                Untitled Sequence
                                <i className="fa fa-arrows block-control" />
                                <i className="fa fa-pencil block-control" />
                              </button>
                            </div>{/* end ngRepeat: seq in storedSequences track by $id(seq) */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="green button-like widget-control" ng-click="saveSequence(sequence)">
                          Save
                        </button>
                        <button className="yellow button-like widget-control" ng-click="execute(sequence)">
                          Execute
                        </button>
                        <button className="red button-like widget-control" ng-click="deleteSequence(sequence)">
                          Delete
                        </button>
                        <div className="widget-header">
                          <h5>Sequence Editor</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content">
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
                            <div as-sortable="dragControlListeners" className="col-sm-12 ng-pristine ng-untouched ng-valid" ng-model="sequence.steps">
                              {/* ngRepeat: step in sequence.steps | orderBy: 'position' */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="drag-drop-area padding">DROP OPERATIONS AND SEQUENCES HERE</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Operations</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content no-bottom-padding">
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left blue-block block-header no-radius block" ng-click="addStep('move_absolute')">
                                  MOVE ABSOLUTE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left green-block block-header no-radius block" ng-click="addStep('move_relative')">
                                  MOVE RELATIVE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left orange-block block-header no-radius block" ng-click="addStep('pin_write')">
                                  WRITE PIN
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left yellow-block block-header no-radius block" ng-click="addStep('read_pin')">
                                  READ PIN
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left gray-block block-header no-radius block" ng-click="addStep('wait')">
                                  WAIT
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left red-block block-header no-radius" ng-click="addStep('send_message')">
                                  SEND MESSAGE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left brown-block block-header no-radius block" ng-click="addStep('if_statement')">
                                  IF STATEMENT
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left purple-block block-header no-radius block" ng-click="addStep('move_relative')">
                                  TAKE PICTURE*
                                  <i className="fa fa-arrows block-control" />
                                </button>
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
        </div>
      </div>
    );
  }
});
