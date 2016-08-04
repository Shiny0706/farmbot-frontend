import { RegimenItem } from "../interfaces";
import { Sequence } from "../../sequences/interfaces";

export interface BulkSchedulerOutput {
  index: number;
  regimenItems: RegimenItem[];
}

export interface BulkSchedulerState {
  currentRegimen: number;
  sequence?: Sequence;
  form: BulkScheduleForm;
}

export interface BulkScheduleForm {
  /** Time in ms to offset each action at the start of the day. */
  dailyOffsetMs: number;
  weeks: Week[];
}

export interface Week {
  days: {
    day1: boolean;
    day2: boolean;
    day3: boolean;
    day4: boolean;
    day5: boolean;
    day6: boolean;
    day7: boolean;
  };
}
