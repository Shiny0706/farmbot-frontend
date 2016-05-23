import * as React from "react";
import { RegimenItem } from "../interfaces";
import { Sequence } from "../../sequences/interfaces";
import * as moment from "moment";
import { duration } from "moment";

interface RegimenItemDayGroupProps {
    day: string;
    items: RegimenItem[];
}
function RegimenItemDayGroup({ day, items }: RegimenItemDayGroupProps) {
    return <div className="regimen-day">
        <label>Day { day }</label>
        { items.map(function(item, inx) {
            return <RegimenItemStep item={ item } key={inx}/>;
        }) }
    </div>;
}

interface RegimenItemStepProps {
    item: RegimenItem;
}
function RegimenItemStep({ item }: RegimenItemStepProps) {
    let d = duration(item.timeOffset);
    let time = moment({
      hour: d.hours(),
      minute: d.minutes()
    }).format("h:mm a");

    return <div className="regimen-event">
        <span className="regimen-event-title"> { item.sequence.name } </span>
        <span className="regimen-event-time"> { time } </span>
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
