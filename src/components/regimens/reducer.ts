import { RegimensState,
    RegimensActionHandler,
    Regimen } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { stubs } from "./temporary_stubs";
import { randomColor } from "../../util";

export function emptyRegimen(): Regimen {
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
        s = _.cloneDeep(s);
        let update = _.assign<{},
            Regimen>({},
            a.payload.regimen,
            a.payload.update,
            { dirty: true });
        s.all[s.current] = update;
        return s;
    },
    SAVE_REGIMEN: function(s, a) {
        s = _.cloneDeep(s);
        let update = _.assign<{}, Regimen>({}, a.payload, { dirty: false });
        s.all[s.current] = update;
        return s;
    },
    DELETE_REGIMEN: function(s, a) {
        s = _.cloneDeep(s);
        s.all.splice(s.current, 1);
        s.current = (s.current <= 1) ? 0 : (s.current - 1);
        return s; // Lol this method is gross.
    },
    NEW_REGIMEN: function(s, a) {
      s = _.cloneDeep(s);
      s.all.push(emptyRegimen());
      return s;
    },
    SELECT_REGIMEN: function(s, a) {
      s = _.cloneDeep(s);
      s.current = a.payload;
      return s;
    },
    COMMIT_BULK_EDITOR: function(s: RegimensState, a: ReduxAction<any>) {
      s = _.cloneDeep(s);
      let { regimenItems, index } = a.payload;
      let ok = _.cloneDeep(regimenItems);
      let hmm = s.all[index].items;
      s.all[index].items = hmm.concat(ok)
      console.warn("STOPPED HERE");
      // debugger;
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
