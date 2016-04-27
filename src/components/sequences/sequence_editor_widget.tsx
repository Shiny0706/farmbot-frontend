import * as React from "react";
import { MoveRelativeStep } from "./move_relative_step";
import { editCurrentSequence } from "./sequence_actions";

function Step ({step, index, dispatch}) {
  return (<div>
            <MoveRelativeStep step={step} index={index} dispatch={dispatch} />
          </div>
         );
};

let StepList = ({sequence, dispatch}) => {
  return (<div>
            { sequence.steps.map((step, inx) => {
              return <Step step={ step }
                           key={ inx }
                           index={ inx }
                           dispatch={ dispatch } />;
            }) }
          </div>);
};

// ZOMG CURRYING!?! IS THIS REAL FP!?
let handleNameUpdate = (dispatch) => (event) => {
   dispatch(editCurrentSequence({name: event.target.value}));
 };

export function SequenceEditorWidget({sequences, dispatch}) {
  let seq: Sequence = sequences.current;
  return( <div>
            <div className="widget-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <button className="green button-like widget-control">
                    Save { seq.dirty ? " *" : "" }
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
                    <input placeholder="Sequence Name"
                           value={ seq.name }
                           onChange={ handleNameUpdate(dispatch) }
                           type="text" />
                    { <StepList sequence={ seq } dispatch={ dispatch } /> }
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="drag-drop-area padding">DRAG ACTIONS HERE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> );
}
