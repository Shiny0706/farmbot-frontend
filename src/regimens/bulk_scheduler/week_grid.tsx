import * as React from "react";
import { WeekRow } from "./week_row";
import { Week } from "./interfaces";
import { pushWeek, popWeek } from "./actions";
import { t } from "i18next";

interface WeekGridProps {
 weeks: Week[];
 dispatch: Function;
};

export function WeekGrid({weeks, dispatch}: WeekGridProps) {
    return <div>
        <div className="row">
            <div className="col-sm-12">
                <label className="center margin-top margin-left">Days</label>
                { weeks.map(function(week, i) {
                  return <WeekRow key={i} index={i} week={week} dispatch={ dispatch }/>;
                }) }
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
            <button className="green button-like left widget-control"
                    onClick={ () => dispatch(pushWeek()) }>
              <i className="fa fa-plus" /> {t("Week")}
            </button>
            <button className="red button-like left widget-control"
                    onClick={ () => dispatch(popWeek()) }>
              <i className="fa fa-minus" /> {t("Week")}
            </button>
            </div>
        </div>
    </div>;
};
