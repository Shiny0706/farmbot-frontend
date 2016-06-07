import { ReduxAction } from "./interfaces";

const NOOP = (s, a) => s;

const IS_ANON_FN = `You probably passed an anonymous function to generatedReducer.add().
                    Try using a named function instead (Eg: 'function Foo(){}',
                    not 'foo = function(){}')`;

/** Get a function's name in NON-ES6 ENVIRONMENTS (yes, I know ES6 has function.proto.name). */
function name(fun) {
    // Thanks, Vlad Alexandru Ionescu
    // http://stackoverflow.com/a/15714445/1064917
    var ret = fun.toString();
    ret = ret.substr("function ".length);
    ret = ret.substr(0, ret.indexOf("("));
    if (!ret) { throw new Error(IS_ANON_FN); }
    return ret;
}

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
        /** Add function that responds to particular Redux action for current reducer.
         * For example, if the reducer must respond to ADD_TOO,
         * call myReducer.add(function ADD_TODO(state, action){ . . . })
         */
        add?: <T>(fn: GenericActionHandler<T>) => GeneratedReducer; // Calms the type checker.
    }

    let actionHandlers: ActionHandlerDict = { DEFAULT };

    let reducer: GeneratedReducer = function<T>(state = initialState,
                                                action: ReduxAction<T>): State {
        let handler = (actionHandlers[action.type] || actionHandlers["DEFAULT"]);
        let result: State = handler(state, action);
        return result;
    };

    reducer.add = function addHandler<T>(fn: GenericActionHandler<T>) {
        actionHandlers[name(fn)] = fn;
        return reducer;
    };

    return reducer;
}
