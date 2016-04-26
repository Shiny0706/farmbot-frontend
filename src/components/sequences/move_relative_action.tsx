import * as React from 'react';

export class MoveRelativeAction extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="action-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="action-header move-relative-action">
                      <h5>Move Relative</h5>
                      <i className="fa fa-arrows-v action-control" />
                      <i className="fa fa-clone action-control" />
                      <i className="fa fa-trash action-control" />
                      <i className="fa fa-angle-up action-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="action-content move-relative-action">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>X</label>
                          <input type="text" placeholder="0.123m"></input>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Y</label>
                          <input type="text" placeholder="0.123m"></input>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Z</label>
                          <input type="text" placeholder="0.123m"></input>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Speed</label>
                          <input type="text" placeholder="Default"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}
