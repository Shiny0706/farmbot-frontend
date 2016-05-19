import * as React from 'react';

export class RegimenEditorWidget extends React.Component<any, any> {
  render() {
    return( <div>
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
                      <input id="right-label" placeholder="Regimen Name" type="text" />
                      <div className="regimen-day">
                        <label>Day 1</label>
                        <div className="regimen-event">
                          <span className="regimen-event-title">Sequence Name</span>
                          <span className="regimen-event-time">10:30 AM</span>
                          <i className="fa fa-trash regimen-control" />
                        </div>
                        <div className="regimen-event">
                          <span className="regimen-event-title">Sequence Name</span>
                          <span className="regimen-event-time">10:30 AM</span>
                          <i className="fa fa-trash regimen-control" />
                        </div>
                      </div>
                      <div className="regimen-day">
                        <label>Day 2</label>
                        <div className="regimen-event">
                          <span className="regimen-event-title">Sequence Name</span>
                          <span className="regimen-event-time">10:30 AM</span>
                          <i className="fa fa-trash regimen-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}
