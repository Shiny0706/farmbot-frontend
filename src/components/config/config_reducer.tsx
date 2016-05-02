import { ChangeApiUrl } from "./config_actions";
import { assign } from "lodash";

interface ConfigReducerState {
  farmbotApiUrl: string;
}

let initialState: ConfigReducerState = {
  farmbotApiUrl: "//staging.farmbot.io"
};

let reduce = {
  CHANGE_API_URL: function(state: ConfigReducerState,
                           action: ChangeApiUrl): ConfigReducerState {
    let newState = assign<{}, ConfigReducerState>({}, state);
    newState.farmbotApiUrl = action.payload.farmbotApiUrl;
    return newState;
  },
  DEFAULT: function(state: ConfigReducerState, action): ConfigReducerState {
    return state;
  }
};

export function configReducer(state = initialState,
                              action): ConfigReducerState {
  let reduceFn = reduce[action.type] || reduce["DEFAULT"];
  let result = reduceFn(state, action);
  return result;
};
