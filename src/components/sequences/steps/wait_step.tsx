import * as React from "react";
import { changeStep, removeStep, pushStep } from "../sequence_actions";
import { assign } from "lodash";
import { Step, Sequence } from "../interfaces";

interface CopyParams {
  dispatch: Function;
  step: Step;
  index: number;
}

function copy({dispatch, step, index}: CopyParams) {
  let copy = assign<{}, Step>({}, step);
  dispatch(pushStep(copy, (index + 1)));
};

interface RemoveParams {
  index: number;
  dispatch: Function;
}

function remove({dispatch, index}: RemoveParams) {
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

interface IStepInputBox {
  step: Step;
  field: string;
  dispatch: Function;
  index: number;
}
function StepInputBox({step, field, dispatch, index}: IStepInputBox) {
  return <input type="text"
                value={ step.command[field] }
                onChange={ updateStep({dispatch, step, index, field}) } />;
}

interface WaitStepParams {
  dispatch: Function;
  step: Step;
  index: number;
}
export function WaitStep({dispatch,
                                    step,
                                    index}: WaitStepParams) {
    return( <div>
              <div className="step-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="step-header wait-step">
                      <input className="step-label" placeholder="Wait"/>
                      <i className="fa fa-arrows-v step-control" />
                      <i className="fa fa-clone step-control"
                         onClick={ () => copy({dispatch, step, index}) } />
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
                                        field="time"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );
}
