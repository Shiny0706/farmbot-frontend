import { ReduxAction } from "./interfaces";

const NOOP = (s, a) => s;

export function generateReducer<State>(
  initialState: State,
  /** Set "catch all" handler for unknown action names. Default is a no-op fn.
   *  Useful for logging / debugging. */
  DEFAULT = NOOP) {
    /** A function that responds to a particular action from within a generated reducer. */
    interface ActionHandler {
        (state: State, action: ReduxAction<any>): State;
        // TODO: Remove explicit any in favor of generic.
    }

    interface GenericActionHandler<T> {
        (state: State, action: ReduxAction<T>): State;
        // TODO: Remove explicit any in favor of generic.
    }

    interface ActionHandlerDict {
        [actionHandler: string]: ActionHandler;
        DEFAULT: ActionHandler;
    }

    interface GeneratedReducer extends ActionHandler {
        /** Adds action handler for current reducer. */
        add?: <T>(name: string,
                  fn: GenericActionHandler<T>) => GeneratedReducer; // Calms the type checker.
    }

    let actionHandlers: ActionHandlerDict = { DEFAULT };

    let reducer: GeneratedReducer = function<T>(state = initialState,
                                                action: ReduxAction<T>): State {
        let handler = (actionHandlers[action.type] || actionHandlers["DEFAULT"]);
        let result: State = handler(state, action);
        return result;
    };

    reducer.add = function addHandler<T>(name: string, fn: GenericActionHandler<T>) {
        actionHandlers[name] = fn;
        return reducer;
    };

    return reducer;
}
