import * as React from "react";
import { RegimenProps } from "../interfaces";
import { randomColor } from "../../../util";
import { selectRegimen } from "../actions";

interface RegimenListItemProps extends RegimenProps {
  index: number;
}
export function RegimenListItem({regimen,
                                 dispatch,
                                 index}: RegimenListItemProps) {
    let color = regimen.color || randomColor();
    let style = `block full-width text-left ${ color }-block block-header`;
    return <div>
        <button className={ style }
                onClick={ select(dispatch, index) }>
            {regimen.name}{ regimen.dirty ? "*" : "" }
            <i className="fa fa-pencil block-control" />
        </button>
    </div>;
}

function select(dispatch, index) {
  return (event) => dispatch(selectRegimen(index));
}
