import * as React from "react";
import { RegimenItem } from "../interfaces";
import { Sequence } from "../../sequences/interfaces";
import { duration } from "moment";

interface RegimenItemDayGroupProps {
  day: string;
  items: RegimenItem[];
}
function RegimenItemDayGroup({ day, items }: RegimenItemDayGroupProps) {
    return <div className="regimen-day">
        <label>Day { day }</label>
      { items.map((item, inx) => <RegimenItemStep sequence={ item.sequence } key={ inx }/>)}
    </div>;
}

interface RegimenItemStepProps {
  sequence: Sequence;
}
function RegimenItemStep({sequence}: RegimenItemStepProps) {
    return <div className="regimen-event">
        <span className="regimen-event-title"> { sequence.name }</span>
        <span className="regimen-event-time">10:30 AM</span>
        <i className="fa fa-trash regimen-control" />
    </div>;
}

interface RegimenItemListProps {
  items: RegimenItem[];
}

export function RegimenItemList({ items }) {
    let groups = _.groupBy<RegimenItem>(items, function(item: RegimenItem) {
      return duration(item.timeOffset).days();
    });

    let list = _.map(groups, function(innerItems, day) {
      return <RegimenItemDayGroup day={ day } items={ innerItems } key={ day }/>;
    });

    return <div> { list } </div>
}
