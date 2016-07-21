import { OpenFarm } from "./openfarm";
import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { TickerState } from "../ticker/interfaces";
import { BulkSchedulerState } from "../regimens/bulk_scheduler/interfaces";
import { RegimensState } from "../regimens/interfaces";
import { SequenceReducerState } from "../sequences/interfaces";

/** All the props. TODO: Add all the interfaces to this prop ball. */
export interface Everything {
  location: {
    /** EX: /app/dashboard/designer */
    pathname: string;
    /** EX: ?id=twowing-silverbell&p1=SpeciesInfo */
    search: string;
    hash: string;
    /** ¯\_(ツ)_/¯ */
    state: void;
    /** EX: "PUSH" */
    action: string;
    /** EX:  jhedoi */
    key: string;
    /** URL ?Query=string, converted to JS object. */
    query: { [name: string]: string };
  };
  auth: AuthState;
  designer: DesignerState;
  dispatch: Function;
  bot: BotState;
  ticker: TickerState;
  sequences: SequenceReducerState;
  regimens: RegimensState;
  bulkScheduler: BulkSchedulerState;
}

/** OFCrop bundled with corresponding profile image from OpenFarm API. */
export interface CropLiveSearchResult {
  crop: OpenFarm.OFCrop;
  image: string;
}

export interface Plant {
  _id: string;
  planted_at: number;
  img_url: string;
  name: string;
  x: number;
  y: number;
  planting_area_id: string;
  icon_url: string; // ? Maybe this will change.
  openfarm_slug: string; // ? Maybe this will change.
}

export interface Specimen {
  _id: string;
  name: string;
  imgUrl: string;
}

export interface DesignerState {
  x_size: number;
  y_size: number;
  plants: Plant[];
  cropSearchQuery: string;
  cropSearchResults: CropLiveSearchResult[];
}
