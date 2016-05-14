import * as React from "react";
import { AuthToken } from "../auth/auth_actions";
import { Step as IStep, Sequence } from "./interfaces";
import { execSequence } from "../devices/bot_actions";
import { editCurrentSequence,
         saveSequence,
         deleteSequence,
         nullSequence } from "./sequence_actions";
import { stepTiles, StepTile } from "./step_tiles";
let Oops: StepTile = (_) => { return <div>Whoops! Not a valid message_type</div>; };
let StepList = ({sequence, sequences, dispatch}) => {
    return (<div>
        { sequence.steps.map((step: IStep, inx: number) => {
            let Step = stepTiles[step.message_type] || Oops;
            return <Step step={ step }
                         key={ inx }
                         index={ inx }
                         dispatch={ dispatch }
                         sequence={ sequence }
                         sequences={ sequences } />;
        }) }
    </div>);
};

let handleNameUpdate = (dispatch: Function) => (event: React.SyntheticEvent) => {
    let name: string = event.target["value"] || ""; // Typescript workaround.
    dispatch(editCurrentSequence({ name }));
};

let save = function(dispatch: Function, sequence: Sequence, token: AuthToken) {
    return (e: React.SyntheticEvent) => dispatch(saveSequence(sequence));
};

let destroy = function(dispatch: Function,
                       sequence: Sequence,
                       token: AuthToken,
                       inx: number) {
    return () => dispatch(deleteSequence(inx));
};

let performSeq = (dispatch, sequence) => (e) => {
  dispatch(execSequence(sequence));
};

export function SequenceEditorWidget({sequences, dispatch, auth}) {
    let token = auth;
    let inx = sequences.current;
    let sequence: Sequence = sequences.all[inx] || nullSequence();
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <button className="green button-like widget-control"
                        onClick={ save(dispatch, sequence, token) }>
                        Save { sequence.dirty ? " *" : "" }
                    </button>
                    <button className="yellow button-like widget-control"
                            onClick={ performSeq(dispatch, sequence) }>
                        Execute
                    </button>
                    <button className="red button-like widget-control"
                        onClick={ destroy(dispatch, sequence, token, inx) }>
                        Delete
                    </button>
                    <div className="widget-header">
                        <h5>Sequence Editor</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content no-bottom-padding">
                        <input placeholder="Sequence Name"
                            value={ sequence.name }
                            onChange={ handleNameUpdate(dispatch) }
                            type="text" />
                        { <StepList sequence={ sequence }
                                    dispatch={ dispatch }
                                    sequences={ sequences.all } /> }
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
