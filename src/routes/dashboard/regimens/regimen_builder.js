import React from 'react';
import { Navbar } from '../../../components/navbar';
import { Link } from 'react-router';
import { OperationsWidget } from '../../../routes/dashboard/sequences/operations_widget';
import { SequencesWidget } from '../../../routes/dashboard/sequences/sequences_widget';

export var Regimens = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div>
            <div className="row">
              <div className="col-md-3 col-sm-12 col-md-offset-1">
                <OperationsWidget/>
                <SequencesWidget/>
              </div>
              <div className="col-md-4 col-sm-12">
                <div>
                  <div className="widget-wrapper regimen-editor-widget">
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
                  <div className="widget-wrapper regimens-widget">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="main-nav-button">
                          <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
                            <span className="glyphicon glyphicon-menu-hamburger" />
                          </button>
                        </div>
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
