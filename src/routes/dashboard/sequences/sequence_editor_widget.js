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
                      Execute
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
                      <input id="right-label" placeholder="Sequence Name" type="text" />
                      <div className="row">
                        <div className="col-sm-12">
                          <label>Sequence Parameters:</label>
                          <a className="tiny expand button round dark-gray" href="#">PLANT-ID/PLANT-GROUP-ID</a>
                        </div>
                      </div>
                      <div className="row">
                        <div as-sortable="dragControlListeners" className="col-sm-12">
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
            </div> );

  }
}

