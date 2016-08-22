import { AuthState } from "./auth/interfaces";
import { BotState } from "./devices/interfaces";
import { TickerState } from "./ticker/interfaces";
import { BulkSchedulerState } from "./regimens/bulk_scheduler/interfaces";
import { RegimensState } from "./regimens/interfaces";
import { SequenceReducerState } from "./sequences/interfaces";
import { DesignerState } from "./farm_designer/interfaces";

/** Regimens and sequences may have a "color" which determines how it looks
    in the UI. Only certain colors are valid. */
export type Color = "blue"|"green"|"yellow"|"orange"|"purple"|"pink"|"gray"|"red";

export interface ReduxAction<T> {
  readonly type: string;
  readonly payload: T;
};


/** All the props. TODO: Add all the interfaces to this prop ball. */
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
  location: Location;
  auth: AuthState;
  designer: DesignerState;
  dispatch: Function;
  bot: BotState;
  ticker: TickerState;
  sequences: SequenceReducerState;
  regimens: RegimensState;
  bulkScheduler: BulkSchedulerState;
};
