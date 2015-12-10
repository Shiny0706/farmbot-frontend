import React from 'react';
import { Navbar } from '../../../components/navbar';
import { Link } from 'react-router';

export var Regimens = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div>
            <div className="row">

              <div className="col-md-3 col-sm-12 col-md-offset-1">
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
                                <button className="full-width text-left blue-block block-header no-radius block">
                                  MOVE ABSOLUTE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left green-block block-header no-radius block">
                                  MOVE RELATIVE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left orange-block block-header no-radius block">
                                  WRITE PIN
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left yellow-block block-header no-radius block">
                                  READ PIN
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left gray-block block-header no-radius block">
                                  WAIT
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left red-block block-header no-radius">
                                  SEND MESSAGE
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left brown-block block-header no-radius block">
                                  IF STATEMENT
                                  <i className="fa fa-arrows block-control" />
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <div className="block-wrapper">
                                <button className="full-width text-left purple-block block-header no-radius block">
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

                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Sequences</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <div className="block-wrapper">
                            <div>
                              <button className="block full-width no-radius text-left purple-block block-header">
                                Untitled Sequence
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

              <div className="col-md-4 col-sm-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="green button-like widget-control">
                          Save
                        </button>
                        <button className="red button-like widget-control">
                          Delete
                        </button>
                        <div className="widget-header">
                          <h5>Regimen Editor</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <div className="row">
                            <div className="col-sm-12">
                              <input id="right-label" placeholder="Regimen Name" type="text" />
                            </div>
                          </div>
                          <div className="regimen-day">
                            <label>Day 1</label>
                            <div className="drag-drop-area padding">DROP HERE</div>
                          </div>
                          <div className="regimen-day">
                            <label>Day 2</label>
                            <div className="drag-drop-area padding">DROP HERE</div>
                          </div>
                          <div className="regimen-day">
                            <label>Day 3</label>
                            <div className="drag-drop-area padding">DROP HERE</div>
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
                        <button className="gray button-like widget-control">
                          Add
                        </button>
                        <div className="widget-header">
                          <h5>Regimens</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <div className="block-wrapper">
                            <div>
                              <button className="block full-width no-radius text-left purple-block block-header">
                                Untitled Regimen
                                <i className="fa fa-pencil block-control" />
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
    );
  }
});
