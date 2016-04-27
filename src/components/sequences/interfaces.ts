// interface Command {
//   action: string; // TODO: Create a string type for these.
// };

type Color = "blue"|"green"|"yellow"|"orange"|"purple"|"pink"|"gray"|"red";

type Steps = Array<Step>;

export interface Sequence {
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

export interface Step {
  message_type: "emergency_stop"|"home_all"|"home_x"|"home_y"|"home_z"|"move_absolute"|"move_relative"|"pin_write"|"read_parameter"|"read_status"|"write_parameter"|"wait"|"send_message"|"if_statement"|"read_pin";
  x?: number;
  y?: number;
  z?: number;
  speed?: number;
  delay?: number;
  // position: number;
  // command: Command;
};
