import * as React from "react";
import { MoveRelativeAction } from "./move_relative_action";
import { editCurrentSequence } from "./sequence_actions";

let Step = ({step}) => {
  return (<div>
            <MoveRelativeAction step={step}/>
          </div>
         );
};

let Sequence = ({sequence}) => {
  return (<div>
            { sequence.steps.map((step, inx) => <Step step={ step } key={inx} />) }
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
                    { <Sequence sequence={ seq } /> }
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
