import * as React from 'react';

export class OperationsWidget extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="widget-wrapper operations-widget">
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
                            <button className="full-width text-left blue-block block-header block">
                              MOVE ABSOLUTE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left green-block block-header block">
                              MOVE RELATIVE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left orange-block block-header block">
                              WRITE PIN
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left yellow-block block-header block">
                              READ PIN
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left gray-block block-header block">
                              WAIT
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left red-block block-header">
                              SEND MESSAGE
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left brown-block block-header block">
                              IF STATEMENT
                              <i className="fa fa-arrows block-control" />
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="block-wrapper">
                            <button className="full-width text-left purple-block block-header block">
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
            </div> );

  }
}
