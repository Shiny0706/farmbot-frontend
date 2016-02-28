import React from 'react';

export class OperationsWidget extends React.Component {
  render() {
    return( <div>
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
                    <div className="widget-content">
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left blue-block block-header block">
                              MOVE ABSOLUTE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left green-block block-header block">
                              MOVE RELATIVE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left orange-block block-header block">
                              WRITE PIN
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left yellow-block block-header block">
                              READ PIN
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left brown-block block-header block">
                              WAIT
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left red-block block-header">
                              SEND MESSAGE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left purple-block block-header block">
                              IF STATEMENT
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left gray-block block-header block">
                              EXECUTE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}
