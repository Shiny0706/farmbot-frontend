import * as React from "react";
import { Regimen } from "../interfaces";
import { Sequence } from "../../sequences/interfaces";
import { AddButton } from "./add_button";
import { SequenceList } from "./sequence_list";
import { TimeInput } from "./time_input";
import { WeekGrid } from "./week_grid";

interface BulkEditorProps {
    sequences: Sequence[];
    regimen: Regimen;
    dispatch: Function;
}

export function BulkSchedulerWidget({sequences, regimen, dispatch}: BulkEditorProps) {
    return (<div>
        <div className="widget-wrapper bulk-scheduler-widget">
            <div className="row">
                <div className="col-sm-12">
                    <AddButton regimen={ regimen } dispatch={ dispatch }/>
                    <div className="widget-header">
                        <h5>Scheduler</h5>
                        <i className="fa fa-question-circle widget-help-icon">
                            <div className="widget-help-text">Use this tool to schedule
                                a sequence to run on many days of your regimen. Tip: the
                                checkboxes on the top and left side of the calendar can
                                be used to bulk select days. Note: this is coming soon!</div>
                        </i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="widget-content">
                        <div className="row">
                            <div className="col-sm-8">
                                <SequenceList sequences={ sequences } />
                            </div>
                            <div className="col-sm-4">
                                <TimeInput />
                            </div>
                        </div>
                    <WeekGrid />
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
