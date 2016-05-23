import { RegimensState,
         RegimensActionHandler,
         Regimen } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { stubs } from "./temporary_stubs";

let action_handlers: RegimensActionHandler = {
    DEFAULT: function(s, a) { return s; },
    /** Currently just a stub */
    EDIT_REGIMEN: function(s, a) {
      s = _.clone(s);
      let update = _.assign<{},
                            Regimen>({},
                                     a.payload.regimen,
                                     a.payload.update,
                                     {dirty: true});
      s.all[s.current] = update;
      return s;
    },
    SAVE_REGIMEN: function(s, a) {
      s = _.clone(s);
      let update = _.assign<{}, Regimen>({}, a.payload, { dirty: false });
      s.all[s.current] = update;
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
