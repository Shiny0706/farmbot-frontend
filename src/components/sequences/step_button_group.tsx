import * as React from "react";
import { pushStep } from "./sequence_actions";
import { UnplacedStep,
    StepCommand as Command,
    messageType } from "./interfaces";

let addStep = (dispatch) =>
    (step: UnplacedStep) =>
        (event) => { dispatch(pushStep(step)); };

let step = function(message_type: messageType,
    command: Command = {}): UnplacedStep {
    return { message_type, command };
};

export function StepButtonGroup({dispatch}) {
    let clickToAdd = addStep(dispatch);
    // TODO Farmbot does not natively support an "EXECUTE" (unconditional jmp)
    // command. For now we're sneakily making it an if_statement that is always
    // true.
    let temporaryHack = clickToAdd({
      message_type: "if_statement",
      command: {}
    });
    return (<div>
        <div className="widget-wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-header">
                        <h5>Actions</h5>
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
                                        onClick={ clickToAdd(step("move_absolute")) }>
                                        MOVE ABSOLUTE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left green-block block-header block"
                                        onClick={ clickToAdd(step("move_relative")) }>
                                        MOVE RELATIVE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left orange-block block-header block"
                                        onClick={ clickToAdd(step("pin_write")) }>
                                        WRITE PIN
                                    </button>
                                    <i className="fa fa-arrows block-control" />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left yellow-block block-header block"
                                        onClick={ clickToAdd(step("read_pin")) }>
                                        READ PIN
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left brown-block block-header block"
                                        onClick={ clickToAdd(step("wait")) }>
                                        WAIT
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className="full-width text-left red-block block-header"
                                        onClick={ clickToAdd(step("send_message")) }>
                                        SEND MESSAGE
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left purple-block block-header block"
                                        onClick={ clickToAdd(step("if_statement")) }>
                                        IF STATEMENT*
                                        <i className="fa fa-arrows block-control" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="block-wrapper">
                                    <button className=
                                        "full-width text-left gray-block block-header block"
                                        onClick={ temporaryHack }>
                                        EXECUTE
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
