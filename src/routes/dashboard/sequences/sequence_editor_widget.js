import React from 'react';

export class SequenceEditorWidget extends React.Component {
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
                          <div className="drag-drop-area padding">DROP OPERATIONS HERE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}

