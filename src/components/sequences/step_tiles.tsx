import * as React from "react";
import { changeStep, removeStep, pushStep } from "./sequence_actions";
import { assign } from "lodash";
import { Step } from "./interfaces";
import { Help } from "../help";
import { ExecuteBlock } from "./execute_block";
import { Sequence } from "./interfaces.ts";

interface CopyParams {
  dispatch: Function;
  step: Step;
}

export function copy({dispatch, step}: CopyParams) {
  let copy = assign<{}, Step>({}, step);
  dispatch(pushStep(copy));
};

interface RemoveParams {
  index: number;
  dispatch: Function;
}

export function remove({dispatch, index}: RemoveParams) {
  dispatch(removeStep(index));
}

interface UpdateStepParams {
  dispatch: Function;
  step: Step;
  index: number;
  field: string; // "x"|"y"|"z"|"speed";
}

let updateStep = function ({ dispatch,
                             step,
                             index,
                             field }: UpdateStepParams) {
  return (e) => {
    let update = assign<{}, Step>({}, step);
    update.command[field] = e.target.value;
    let action = changeStep(index, update);
    dispatch(action);
  };
};

interface IStepInput {
  step: Step;
  field: "speed"
         | "pin"
         | "value"
         | "mode"
         | "operator"
         | "x"
         | "y"
         | "z"
         | "stub" // For unimplemented features.
         | "variable"
         ;
  dispatch: Function;
  index: number;
}

export function StepInputBox({step, field, dispatch, index}: IStepInput) {
  return <input type="text"
                value={ step.command[field] }
                onChange={ updateStep({dispatch, step, index, field}) } />;
}

export interface StepParams {
  dispatch: Function;
  step: Step;
  index: number;
  sequence: Sequence;
  sequences: Sequence[];
}

export type StepTile = (input: StepParams) => JSX.Element;

interface StepDictionary {
  [stepName: string]: StepTile;
};

let Pending = ({ dispatch, index }: StepParams) => {
  return <div>
              <Help text="Not done yet :(" />
              Coming soon!
              Delete: <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
         </div>;
};

export let stepTiles: StepDictionary = {
  emergency_stop: Pending,
  home_all: Pending,
  home_x: Pending,
  home_y: Pending,
  home_z: Pending,
  read_status: Pending,
  write_parameter: Pending,
  read_parameter: Pending,
  if_statement: ExecuteBlock,
  execute: Pending,
  move_relative: function({dispatch, step, index}: StepParams) {
      return( <div>
                <div className="step-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                      <div className="step-header move-relative-step">
                        <input className="step-label" placeholder="Move Relative"/>
                        <i className="fa fa-arrows-v step-control" />
                        <i className="fa fa-clone step-control"
                           onClick={ () => copy({dispatch, step}) } />
                        <i className="fa fa-trash step-control"
                           onClick={ () => remove({dispatch, index}) } />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="step-content move-relative-step">
                        <div className="row">
                          <div className="col-xs-6 col-md-3">
                            <label>X (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="x"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label>Y (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="y"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label>Z (mm)</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="z"/>
                          </div>
                          <div className="col-xs-6 col-md-3">
                            <label>Speed</label>
                            <StepInputBox dispatch={dispatch}
                                          step={step}
                                          index={index}
                                          field="speed"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> );
  },
  "move_absolute": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header move-absolute-step">
                      <input className="step-label" placeholder="Move Absolute"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content move-absolute-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>X (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="x"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Y (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="y"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Z (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="z"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Speed</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="speed"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>X-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Y-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Z-Offset (mm)</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );
  },
  "pin_write": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header write-pin-step">
                      <input placeholder="Write Pin"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content write-pin-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>Pin Number</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="pin"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Value</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Pin Mode</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="mode"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "wait": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header wait-step">
                      <input className="step-label" placeholder="Wait"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content wait-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>Time in milliseconds</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "send_message": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header send-message-step">
                      <input className="step-label" placeholder="Send Message"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content send-message-step">
                      <div className="row">
                        <div className="col-xs-12">
                          <label>Message</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
  "read_pin": function({dispatch, step, index}: StepParams){
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header read-pin-step">
                      <input className="step-label" placeholder="Read Pin"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step}) } />
                      <i className="fa fa-trash step-control"
                         onClick={ () => remove({dispatch, index}) } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-content read-pin-step">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>Pin Number</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="pin"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Data Label</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="stub"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  },
};
