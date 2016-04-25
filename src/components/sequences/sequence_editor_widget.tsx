import * as React from "react";

export class SequenceEditorWidget extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <button className="green button-like widget-control">
                      Save
                    </button>
                    <button className="yellow button-like widget-control">
                      Test
                    </button>
                    <button className="red button-like widget-control">
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
                      <input placeholder="Sequence Name" type="text" />
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="event">
                            <div className="event-time">
                            abcd
                            </div>
                            <i className="event-icon fa fa-camera"></i>
                            <div className="event-title">efg</div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="drag-drop-area padding">CLICK ON A SEQUENCE STEP TO ADD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}
