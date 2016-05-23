import { ReduxAction } from "../interfaces";
import { Sequence, Color } from "../sequences/interfaces";

/** A list of "sequences" scheduled after a starting point (epoch). */
export interface Regimen {
    _id?: string;
    /** Friendly identifier for humans to easily identify regimens. */
    name: string;
    color: Color;
    items: RegimenItem[];
};

/** Individual step that a regimen will execute at a point in time. */
export interface RegimenItem {
    sequence: Sequence;
    /** Time (in milliseconds) to wait before executing the sequence */
    timeOffset: number;
};

/** How Regimen state is stored in the application. Used by Regimen reducer mostly */
export interface RegimensState {
    current: number;
    all: Regimen[];
}

/** Used by regimen reducer to route incoming stream of Redux actions */
export interface RegimensActionHandler {
    [actionName: string]: (state: RegimensState,
        action: ReduxAction<any>) => RegimensState;
}
