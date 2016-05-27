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
    return <div>
        <label>Sequence</label>
        <select value={ sequences.indexOf(current) }
                onChange={ change(dispatch, sequences) }>
            { sequences
                .map((s, i) => { return <SeqListItem s={s} i={i} key={i} />; })
                .concat([NULL_ITEM]) }
        </select>
    </div>;
}

function SeqListItem({s, i}) {
  return <option key={ i } value={ i }>
   { s.name }
  </option>;
}
function change(dispatch, sequences) {
  return (event) => {
    dispatch(setSequence(sequences[event.target.value]));
  };
}
