import * as React from "react";
import { Sequence } from "../../sequences/interfaces";

interface SequenceListProps {
    sequences: Sequence[];
}

export function SequenceList({sequences}: SequenceListProps) {
    return <div>
        <label>Sequence</label>
        <select>
            { sequences.map((s, i) => <option key={ i }> { s.name } </option>) }
        </select>
    </div>
}
