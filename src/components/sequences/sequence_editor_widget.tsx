import * as React from "react";

let Step = ({step}) => {
  return (<p><strong>RORY!!!</strong>: This is where the step will go! It's a { step.message_type } step.</p>);
};

let Sequence = ({sequence}) => {
  return (<div>
            { sequence.steps.map((step, inx) => <Step step={ step } key={inx} />) }
          </div>);
};

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
                      { <Sequence sequence={this.props.sequences.current} /> }
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
