import { RegimensState, RegimensActionHandler } from "./interfaces";
import { ReduxAction } from "../interfaces";

let action_handlers: RegimensActionHandler = {
    DEFAULT: function(s, a) { return s; },
    /** Currently just a stub */
    ADD_REGIMEN: function(s, a) { return s; }
};

const initialState: RegimensState = {
  all: [],
  current: 0
};

export function sequenceReducer(state = initialState,
                                action: ReduxAction<any>) {
    let handler = (action_handlers[action.type] || action_handlers["DEFAULT"]);
    let result: RegimensState = handler(state, action);
    return result;
}
