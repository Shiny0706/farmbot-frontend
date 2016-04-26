// interface Command {
//   action: string; // TODO: Create a string type for these.
//   x?: number;
//   y?: number;
//   z?: number;
//   speed?: number;
//   delay?: number;
// };

interface Sequence {
  color: "blue"|"green"|"yellow"|"orange"|"purple"|"pink"|"gray"|"red";
  name: String;
  steps: Array<Step>;
  dirty?: Boolean;
}

interface Step {
  message_type: "emergency_stop"|"home_all"|"home_x"|"home_y"|"home_z"|"move_absolute"|"move_relative"|"pin_write"|"read_parameter"|"read_status"|"write_parameter"|"wait"|"send_message"|"if_statement"|"read_pin";
  // position: number;
  // command: Command;
};
