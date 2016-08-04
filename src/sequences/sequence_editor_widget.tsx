import * as React from "react";
import { AuthToken } from "../auth/auth_actions";
import { Step as IStep, Sequence } from "./interfaces";
import { execSequence } from "../devices/bot_actions";
import { editCurrentSequence,
         saveSequence,
         deleteSequence,
         nullSequence } from "./sequence_actions";
import { stepTiles, StepTile } from "./step_tiles";
import { Help } from "../help";
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
                        Test
                    </button>
                    <button className="red button-like widget-control"
                        onClick={ destroy(dispatch, sequence, token, inx) }>
                        Delete
                    </button>
                    <div className="widget-header">
                      <h5>Sequence Editor</h5>
                      <i className="fa fa-question-circle widget-help-icon">
                        <div className="widget-help-text">Use this widget to edit
                        sequences. Coming soon: drag and drop steps,
                        custom step names, sequence cloning, and inheritable
                        step properties!</div>
                      </i>
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
