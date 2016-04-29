import * as React from "react";
import { MoveRelativeStep } from "./move_relative_step";
import { editCurrentSequence, saveSequence } from "./sequence_actions";
import { AuthToken } from "../../actions/auth_actions";
import { Step as IStep, Sequence } from "./interfaces";

function Step({step, index, dispatch}) {
    return (<div>
        <MoveRelativeStep step={step} index={index} dispatch={dispatch} />
    </div>
    );
};

let StepList = ({sequence, dispatch}) => {
    return (<div>
        { sequence.steps.map((step: IStep, inx: number) => {
            return <Step step={ step }
                key={ inx }
                index={ inx }
                dispatch={ dispatch } />;
        }) }
    </div>);
};

let handleNameUpdate = (dispatch: Function) => (event: React.SyntheticEvent) => {
    let name: string = event.target["value"] || ""; // Typescript workaround.
    dispatch(editCurrentSequence({ name }));
};

let save = function(dispatch: Function, sequence: Sequence, token: AuthToken) {
  return (e: React.SyntheticEvent) => dispatch(saveSequence({sequence, token }));
};

export function SequenceEditorWidget({sequences, dispatch, auth}) {
    let token = auth;
    let sequence: Sequence = sequences.all[sequences.current];
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <button className="green button-like widget-control"
                            onClick={ save(dispatch, sequence, token) }>
                        Save { sequence.dirty ? " *" : "" }
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
                            value={ sequence.name }
                            onChange={ handleNameUpdate(dispatch) }
                            type="text" />
                        { <StepList sequence={ sequence } dispatch={ dispatch } /> }
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="drag-drop-area padding">DRAG ACTIONS HERE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
