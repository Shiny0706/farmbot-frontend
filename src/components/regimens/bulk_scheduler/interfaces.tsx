
export interface BulkSchedulerState {
  form: BulkScheduleForm;
}

interface BulkScheduleForm {
  sequence?: number;
  timeOfDay?: TimeOfDay;
  weeks?: Week[];
}

interface TimeOfDay {
  hour: number;
  minute: number;
}

interface Week {
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
