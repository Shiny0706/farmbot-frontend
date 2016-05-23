import { AuthToken } from "./auth/auth_actions";
import { RegimensState } from "./regimens/interfaces";
import { SequenceReducerState } from "./sequences/interfaces";

export interface ReduxAction<T> {
    type: string;
    payload: T;
};


export interface ReduxStateAtom {
  sequences: SequenceReducerState;
  dispatch: Function;
  auth: AuthToken;
  regimens: RegimensState;
}
