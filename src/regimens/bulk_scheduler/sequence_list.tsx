import * as React from "react";
import { Sequence } from "../../sequences/interfaces";
import { setSequence } from "./actions";

interface SequenceListProps {
    sequences: Sequence[];
    current: Sequence;
    dispatch: Function;
}

let NULL_ITEM = <SeqListItem s={{name: "Select Sequence"}} i={ -1 } key={ -1 } />;

export function SequenceList({sequences,
                              current,
                              dispatch}: SequenceListProps) {
    // Handles issue of [{}].indexOf({}) == -1.
    let selectedValue = current ? sequences.indexOf(_.findWhere(sequences, current)) : -1;
    return <div>
        <label>Sequence</label>
        <select value={ selectedValue.toString() }
                onChange={ change(dispatch, sequences) }>
            { [NULL_ITEM]
                .concat(sequences.map((s, i) => { return <SeqListItem s={s} i={i} key={i} />; }))
                 }
        </select>
    </div>;
}

function SeqListItem({s, i}: {s: {name: string}, i: number}) {
  return <option key={ i }
   value={ i.toString() }>
   { s.name }
  </option>;
}
function change(dispatch: Function, sequences: Sequence[]) {
  return (event: React.FormEvent) => {
    let i = _.parseInt((event.target as HTMLInputElement).value || "-999")
    dispatch(setSequence(sequences[i]));
  };
}
