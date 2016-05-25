import * as React from "react";
import { Week } from "./interfaces";

interface WeekRowProps {
  week: Week;
  index: number;
}

let DAYS = [ 1, 2, 3, 4, 5, 6, 7 ];

export function WeekRow({index}: WeekRowProps) {
  let week = index + 1;
  return <div className="week-row">
            <label className="week-label">Week { week }</label>
            {
              DAYS.map(function(day) {
                let id = `day-${week}-${day}`;
                return <Day day={day} id={id} key={id} />;
              })
            }
        </div>;
}

function Day({day, id}) {

  return <div className="day-selector-wrapper">
    <input type="checkbox" id={id} className="day" />
    <label className="day-label left-most" htmlFor={id}>
      { day }
    </label>
  </div>;
}
