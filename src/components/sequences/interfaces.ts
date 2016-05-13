type userVariables = "x"
                    | "y"
                    | "z"
                    | "s"
                    | "busy"
                    | "last"
                    | "pins"
                    | "unknown_parameter_busy"
                    | "unknown_parameter_last"
                    | "param_version"
                    | "unknown_parameter_unknown_parameter_1"
                    | "movement_timeout_x"
                    | "movement_timeout_y"
                    | "movement_timeout_z"
                    | "movement_invert_endpoints_x"
                    | "movement_invert_endpoints_y"
                    | "movement_invert_endpoints_z"
                    | "movement_invert_motor_x"
                    | "movement_invert_motor_y"
                    | "movement_invert_motor_z"
                    | "movement_steps_acc_dec_x"
                    | "movement_steps_acc_dec_y"
                    | "movement_steps_acc_dec_z"
                    | "movement_home_up_x"
                    | "movement_home_up_y"
                    | "movement_home_up_z"
                    | "movement_min_spd_x"
                    | "movement_min_spd_y"
                    | "movement_min_spd_z"
                    | "movement_max_spd_x"
                    | "movement_max_spd_y"
                    | "movement_max_spd_z"
                    | "unknown_parameter_1"
                    | "time"
                    | "pin0"
                    | "pin1"
                    | "pin2"
                    | "pin3"
                    | "pin4"
                    | "pin5"
                    | "pin6"
                    | "pin7"
                    | "pin8"
                    | "pin9"
                    | "pin10"
                    | "pin11"
                    | "pin12"
                    | "pin13";

export type Color = "blue"|"green"|"yellow"|"orange"|"purple"|"pink"|"gray"|"red";

type Steps = Array<Step>;

export interface Sequence {
  _id?: string;
  color: Color;
  name: String;
  steps: Steps;
  dirty?: Boolean;
}

// TODO: Does typescript have subset types?
export interface SequenceOptions {
  color?: Color;
  name?: String;
  steps?: Steps;
  dirty?: Boolean;
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
                          | "pin_write"
                          | "read_parameter"
                          | "read_status"
                          | "write_parameter"
                          | "wait"
                          | "send_message"
                          | "if_statement"
                          | "read_pin"
                          | "execute"
                          ;

/** Similar to "Step", but with an optional "position" argument. */
export interface UnplacedStep {
  message_type: messageType;
  position?: number;
  _id?: string;
  command: StepCommand;
};

/** One step in a larger sequence of execution. */
export interface Step extends UnplacedStep {
  position: number;
};


export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};
