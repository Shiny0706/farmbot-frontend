import * as React from "react";
import { changeStep } from "./sequence_actions";
import { assign } from "lodash";


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
    let update = assign<{}, Step>({}, step, { [field]: e.target.value });
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
                placeholder="0.123m"
                value={ step[field] }
                onChange={ updateStep({dispatch, step, index, field}) } />;
}

interface MoveRelativeStepParams {
  dispatch: Function;
  step: Step;
  index: number;
}
export function MoveRelativeStep({dispatch,
                                    step,
                                    index}: MoveRelativeStepParams) {
    return( <div>
              <div className="action-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="action-header move-relative-action">
                      <h5>Move Relative</h5>
                      <i className="fa fa-arrows-v action-control" />
                      <i className="fa fa-clone action-control" />
                      <i className="fa fa-trash action-control" />
                      <i className="fa fa-angle-up action-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="action-content move-relative-action">
                      <div className="row">
                        <div className="col-xs-6 col-md-3">
                          <label>X</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="x"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Y</label>
                          <StepInputBox dispatch={dispatch}
                                        step={step}
                                        index={index}
                                        field="y"/>
                        </div>
                        <div className="col-xs-6 col-md-3">
                          <label>Z</label>
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
}
