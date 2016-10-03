import { Sequence as FarmBotJsSequence,
         userVariables as FarmBotJsuserVariables } from "farmbot/interfaces";
import { Color } from "../interfaces";

type userVariables = FarmBotJsuserVariables;

type Steps = Array<Step>;

export interface Sequence extends FarmBotJsSequence { }

// Typescript does not have subset types.
// If you are reading this in the future and subset types exist, refactor this code.
export interface SequenceOptions {
  color?: Color;
  name?: string;
  steps?: Steps;
  dirty?: boolean;
}

export interface StepCommand {
  x?: number;
  y?: number;
  z?: number;
  speed?: number;
  delay?: number;
  pin?: number;
  mode?: number;
  position?: number;
  value?: string;
  operator?: ">"|"<"|"!="|"==";
  variable?: userVariables;
  sub_sequence_id?: string;
}

export type messageType = "emergency_stop"
                          | "home_all"
                          | "home_x"
                          | "home_y"
                          | "home_z"
                          | "move_absolute"
                          | "move_relative"
                          | "write_pin"
                          | "read_parameter"
                          | "read_status"
                          | "write_parameter"
                          | "wait"
                          | "send_message"
                          | "if_statement"
                          | "read_pin"
                          | "execute";

/** Similar to "Step", but "position" isnt mandatory. */
export interface UnplacedStep {
  message_type: messageType;
  position?: number;
  id?: number;
  command: StepCommand;
};

/** One step in a larger "Sequence". */
export interface Step extends UnplacedStep {
  position: number;
};


export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};
