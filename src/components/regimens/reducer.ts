import { RegimensState,
    RegimensActionHandler,
    Regimen } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { stubs } from "./temporary_stubs";
import { randomColor } from "../../util";

function emptyRegimen(): Regimen {
    return {
        _id: null,
        name: "Untitled Regimen",
        color: randomColor(),
        items: [],
        dirty: true
    };
}

let action_handlers: RegimensActionHandler = {
    DEFAULT: function(s, a) { return s; },
    /** Currently just a stub */
    EDIT_REGIMEN: function(s, a) {
        s = _.clone(s);
        let update = _.assign<{},
            Regimen>({},
            a.payload.regimen,
            a.payload.update,
            { dirty: true });
        s.all[s.current] = update;
        return s;
    },
    SAVE_REGIMEN: function(s, a) {
        s = _.clone(s);
        let update = _.assign<{}, Regimen>({}, a.payload, { dirty: false });
        s.all[s.current] = update;
        return s;
    },
    DELETE_REGIMEN: function(s, a) {
        s = _.clone(s);
        let toBeDeleted = s.all.indexOf(a.payload);
        if (toBeDeleted < 0) {
            throw (new Error("Sequence not found. Can't delete."));
        }
        s.all.splice(toBeDeleted, 1);
        if (!s.all.length) { s.all.push(emptyRegimen()); }
        return s;
    },
    NEW_REGIMEN: function(s, a) {
      s = _.clone(s);
      s.all.push(emptyRegimen());
      return s;
    }
};

const initialState: RegimensState = {
    all: stubs,
    current: 0
};

export function regimensReducer(state = initialState,
    action: ReduxAction<any>) {
    let handler = (action_handlers[action.type] || action_handlers["DEFAULT"]);
    let result: RegimensState = handler(state, action);
    return result;
}
