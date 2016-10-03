import { AuthState } from "./auth/interfaces";
import { ConfigState } from "./config/interfaces";
import { BotState } from "./devices/interfaces";
import { TickerState } from "./ticker/interfaces";
import { BulkSchedulerState } from "./regimens/bulk_scheduler/interfaces";
import { RegimensState } from "./regimens/interfaces";
import { SequenceReducerState } from "./sequences/interfaces";
import { DesignerState } from "./farm_designer/interfaces";
import { Color as FarmBotJsColor } from "farmbot/interfaces";
/** Regimens and sequences may have a "color" which determines how it looks
    in the UI. Only certain colors are valid. */
export type Color = FarmBotJsColor;

export interface ReduxAction<T> {
  readonly type: string;
  readonly payload: T;
};

/** The "getState()" function, typically passed in by Redux Thunk Middleware. */
export type GetState = () => Everything;
/** A Redux Thunk function. */
export interface Thunk {
  (dispatch: Function, getState: GetState): any;
};

interface Location {
  /** EX: /app/dashboard/designer */
  pathname: string;
  /** EX: ?id=twowing-silverbell&p1=SpeciesInfo */
  search: string;
  hash: string;
  // /** ¯\_(ツ)_/¯ */
  // state: void;
  /** EX: "PUSH" */
  action: string;
  /** EX:  jhedoi */
  key: string;
  /** URL ?Query=string, converted to JS object. */
  query: { [name: string]: string };
};

export interface Everything {
  config: ConfigState;
  auth: AuthState;
  designer: DesignerState;
  dispatch: Function;
  bot: BotState;
  ticker: TickerState;
  sequences: SequenceReducerState;
  regimens: RegimensState;
  bulkScheduler: BulkSchedulerState;
  location: Location;
};
