import * as React from "react";
import { pushStep } from "./actions";
import { Help } from "../help";
import { UnplacedStep, SequenceStepNode } from "./interfaces";
import { StringNode, IntegerNode } from "../ast/interfaces";

let addStep = (dispatch: Function) =>
    (step: UnplacedStep) =>
        (event: React.FormEvent) => { dispatch(pushStep(step)); };

let step = function(message_type: string,
                    command: {[name: string]: IntegerNode | StringNode } ): UnplacedStep {
    return {kind: message_type, args: command};
};

export function StepButtonGroup({dispatch}: {dispatch: Function}) {
    let clickToAdd = addStep(dispatch);
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-header">
                        <h5>{("Commands")}</h5>
                        <i className="fa fa-question-circle widget-help-icon">
                          <div className="widget-help-text">
                            {(`These commands are
                            the most basic things FarmBot can do. Combine them into
                            sequences to create more complex operations for
                            watering, planting seeds, measuring soil properties,
                            and more. Coming soon: drag and drop commands!`)}
                          </div>
                        </i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content no-bottom-padding">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left blue-block block-header block"
                                        onClick={ clickToAdd(
                                            step("move_absolute",
                                             { x: {
                                                 kind: "literal",
                                                 args: {"data_type": "integer", data_value: "0"}
                                                },
                                               y: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "0"}
                                               },
                                               z: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "0"}
                                               },
                                               speed: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "100"}
                                               }
                                              },
                                                )) }>
                                        {("MOVE ABSOLUTE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left green-block block-header block"
                                        onClick={ clickToAdd(
                                            step("move_relative",
                                            {
                                               x: {
                                                 kind: "literal",
                                                 args: {"data_type": "integer", data_value: "0"}
                                                },
                                               y: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "0"}
                                               },
                                               z: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "0"}
                                               },
                                               speed: {
                                                   kind: "literal",
                                                   args: {data_type: "integer", data_value: "100"}
                                               }
                                            }))}>
                                        {("MOVE RELATIVE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left orange-block block-header block"
                                        onClick={ clickToAdd(
                                            step("write_pin",
                                            {
                                                pin_number: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                },
                                                pin_value: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                },
                                                pin_mode: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                }
                                            })) }>
                                        {("WRITE PIN")}
                                    </button>
                                    <i className="fa fa-arrows block-control" />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left yellow-block block-header block"
                                        onClick={ clickToAdd(
                                            step("read_pin",
                                            {
                                                pin_number: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                },
                                                pin_mode: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                }
                                            })) }>
                                        {("READ PIN")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left brown-block block-header block"
                                        onClick={ clickToAdd(
                                            step("wait",
                                            {
                                                milliseconds: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                }
                                            })) }>
                                        {("WAIT")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className="full-width text-left red-block block-header"
                                        onClick={ clickToAdd(
                                            step("send_message",
                                            {
                                                message: {
                                                    kind: "literal",
                                                    args: {data_type: "string", data_value: ""}
                                                }
                                            })) }>
                                        {("SEND MESSAGE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left purple-block block-header block"
                                        onClick={ clickToAdd(
                                            step("if_statement",
                                            {})) }>
                                        {("IF STATEMENT")} <Help text="Coming soon" />
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left gray-block block-header block"
                                        onClick={ clickToAdd(
                                            step("execute",
                                            {
                                                sub_sequence_id: {
                                                    kind: "literal",
                                                    args: {data_type: "integer", data_value: ""}
                                                }
                                            })
                                        ) }>
                                        {("EXECUTE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
