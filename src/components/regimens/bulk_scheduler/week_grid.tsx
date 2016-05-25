import * as React from "react";
import { WeekRow } from "./week_row";
import { Week } from "./interfaces";
import { AddButton } from "./add_button";
import { pushWeek } from "./actions";

interface WeekGridProps {
 weeks: Week[];
 dispatch: Function;
};

export function WeekGrid({weeks, dispatch}: WeekGridProps) {
    console.dir(weeks);
    return <div>
        <div className="row">
            <div className="col-sm-12">
                <label className="center margin-top margin-left">Days</label>
                { weeks.map(function(week, i) {
                  return <WeekRow key={i} index={i} week={week}/>;
                }) }
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <AddButton click={ () => dispatch(pushWeek()) } active={ true } />
            </div>
        </div>
    </div>;
};
