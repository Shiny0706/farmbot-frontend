import * as React from "react";
import { Step as IStep, Sequence } from "./interfaces";
import { execSequence } from "../devices/actions";
import {
    editCurrentSequence,
    saveSequence,
    deleteSequence,
    nullSequence
} from "./actions";
import { stepTiles, StepTile } from "./step_tiles";
import { Everything } from "../interfaces";
import { ColorPicker } from "./color_picker";

let Oops: StepTile = (_) => { return <div>Whoops! Not a valid message_type</div>; };
let StepList = ({sequence, sequences, dispatch}:
    { sequence: Sequence, sequences: Sequence[], dispatch: Function }) => {
    return (<div>
        {sequence.steps.map((step: IStep, inx: number) => {
            let Step = stepTiles[step.message_type] || Oops;
            return <Step step={step}
                key={inx}
                index={inx}
                dispatch={dispatch}
                sequence={sequence}
                sequences={sequences} />;
        })}
    </div>);
};

let handleNameUpdate = (dispatch: Function) => (event: React.SyntheticEvent) => {
    let name: string = (event.target as any)["value"] || ""; // Typescript workaround.
    dispatch(editCurrentSequence({ name }));
};

let save = function (dispatch: Function, sequence: Sequence) {
    return (e: React.SyntheticEvent) => dispatch(saveSequence(sequence));
};

let destroy = function (dispatch: Function,
    sequence: Sequence,
    inx: number) {
    return () => dispatch(deleteSequence(inx));
};

let performSeq = (dispatch: Function, sequence: Sequence) => (e: React.FormEvent) => {
    dispatch(execSequence(sequence));
};

export function SequenceEditorWidget({sequences, dispatch}: Everything) {
    let inx = sequences.current;
    let sequence: Sequence = sequences.all[inx] || nullSequence();
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <button className="green button-like widget-control"
                        onClick={save(dispatch, sequence)}>
                        Save {sequence.dirty ? " *" : ""}
                    </button>
                    <button className="yellow button-like widget-control"
                        onClick={performSeq(dispatch, sequence)}>
                        Test
                    </button>
                    <button className="red button-like widget-control"
                        onClick={destroy(dispatch, sequence, inx)}>
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
                        <div className="row">
                            <div className="col-sm-11">
                                <input placeholder="Sequence Name"
                                    value={sequence.name}
                                    onChange={handleNameUpdate(dispatch)}
                                    type="text" />
                            </div>
                            <div className="col-sm-1">
                                <ColorPicker current={sequence.color}
                                             onChange={(color) => {
                                                 dispatch(editCurrentSequence({color}))
                                                //  dispatch();
                                                 console.log(`You picked ${ color }`);
                                             } } />
                            </div>
                        </div>
                        {<StepList sequence={sequence}
                            dispatch={dispatch}
                            sequences={sequences.all} />}
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
