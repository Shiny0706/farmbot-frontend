import * as React from "react";
import { pushStep } from "./actions";
import { Help } from "../help";
import { Step } from "./interfaces";
import { t } from "i18next";

let addStep = (dispatch: Function) =>
    (step: Step) =>
        (event: React.FormEvent) => { dispatch(pushStep(step)); };

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
                                            {kind: "move_absolute",
                                             args: {x: 0, y: 0, z: 0, speed: 0}}) }>
                                        {("MOVE ABSOLUTE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left green-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "move_relative",
                                            args: {x: 0, y: 0, z: 0, speed: 0}
                                        })}>
                                        { t("MOVE RELATIVE") }
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left orange-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "write_pin",
                                            args: { pin_number: 0, pin_value: 0, pin_mode: 0 }
                                        }) }>
                                        {("WRITE PIN")}
                                    </button>
                                    <i className="fa fa-arrows block-control" />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left yellow-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "read_pin",
                                            args: { pin_number: 0,
                                                    data_label: "---" }
                                        }) }>
                                        {("READ PIN")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left brown-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "wait",
                                            args: { milliseconds: 0 }
                                        }) }>
                                        {("WAIT")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className="full-width text-left red-block block-header"
                                        onClick={ clickToAdd({
                                            kind: "send_message",
                                            args: { message: "Bot is at position {{ x }}." }
                                        }) }>
                                        {("SEND MESSAGE")}
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left purple-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "if_statement",
                                            args: { lhs: 0, op: "is", rhs: 0, sub_sequence_id: 0 }
                                        }) }>
                                        {("IF STATEMENT")} <Help text="Coming soon" />
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left gray-block block-header block"
                                        onClick={ clickToAdd({
                                            kind: "execute",
                                            args: { sub_sequence_id: 0 }
                                        }) }>
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
