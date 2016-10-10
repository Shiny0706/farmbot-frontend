import { userVariables as FarmBotJsuserVariables } from "farmbot/interfaces";
import { BasicNode, IntegerNode, StringNode } from "../ast/interfaces";
import { Color } from "../interfaces";
export const NUMERIC_FIELDS  = ["x", "y", "z", "speed", "pin_number",
        "pin_value", "pin_mode", "milliseconds",
        "sub_sequence_id", "rhs", "sub_sequence_id"];
type userVariables = FarmBotJsuserVariables;
export interface Sequence extends SequenceNode {
  color: Color;
  name: string;
  dirty?: boolean;
  id?: number;
  body: Step[];
}

type Steps = Step[];

// Typescript does not have subset types.
// If you are reading this in the future and subset types exist, refactor this code.
export interface SequenceOptions {
  color?: Color;
  name?: string;
  body?: Step[];
  dirty?: boolean;
}

export type possibleKind = "move_absolute"
                          | "move_relative"
                          | "write_pin"
                          | "read_pin"
                          | "wait"
                          | "send_message"
                          | "execute"
                          | "if_statement";

export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};

interface MoveAbsoluteNode extends BasicNode {
  kind: "move_absolute";
  args: {
    x: IntegerNode | number;
    y: IntegerNode | number;
    z: IntegerNode | number;
    speed: IntegerNode | number;
  };
}

interface MoveRelativeNode extends BasicNode {
  kind: "move_relative";
  args: {
    x: IntegerNode | number;
    y: IntegerNode | number;
    z: IntegerNode | number;
    speed: IntegerNode | number;
  };
}

interface WritePinNode extends BasicNode {
  kind: "write_pin";
  args: {
    pin_number: IntegerNode | number;
    pin_value: IntegerNode | number;
    pin_mode: IntegerNode | number;
  };
}

interface ReadPinNode extends BasicNode {
  kind: "read_pin";
  args: {
    pin_number: IntegerNode | number;
    data_label: StringNode | string;
  };
}

interface WaitNode extends BasicNode {
  kind: "wait";
  args: {
    milliseconds: IntegerNode | number;
  };
}

interface SendMessageNode extends BasicNode {
  kind: "send_message";
  args: {
    message: StringNode | string;
  };
}

interface ExecuteNode extends BasicNode {
  kind: "execute";
  args: {
    sub_sequence_id: IntegerNode | number;
  };
}

interface IfStatementNode extends BasicNode {
  kind: "if_statement";
  args: {
    lhs: userVariables | number
    op: ">" | "<" | "is" | "not";
    rhs: IntegerNode | number;
    sub_sequence_id: IntegerNode | number;
  };
}

export type Step = MoveAbsoluteNode
                      | MoveRelativeNode
                      | WritePinNode
                      | ReadPinNode
                      | WaitNode
                      | SendMessageNode
                      | ExecuteNode
                      | IfStatementNode;

export interface SequenceNode extends BasicNode {
  kind: "sequence";
  args: { };
  body: Step[];
};
