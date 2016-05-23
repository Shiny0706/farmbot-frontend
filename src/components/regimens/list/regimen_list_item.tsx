import * as React from "react";
import { RegimenProps } from "../interfaces";
import { randomColor } from "../../../util";

export function RegimenListItem({regimen}: RegimenProps) {
    let color = regimen.color || randomColor();
    let style = `block full-width text-left ${ color }-block block-header`;
    return <div>
        <button className={ style }>
            {regimen.name}{ regimen.dirty ? "*" : "" }
            <i className="fa fa-pencil block-control" />
        </button>
    </div>;
}
