import { userVariables as FarmBotJsuserVariables } from "farmbot/interfaces";
import { BasicNode, IntegerNode, StringNode } from "../ast/interfaces";
import { Color } from "../interfaces";

type userVariables = FarmBotJsuserVariables;
export interface Sequence extends SequenceNode {
  color: Color;
  name: string;
  dirty?: boolean;
  id?: number;
  body: Step[];
}

type Steps = SequenceStepNode[];

// Typescript does not have subset types.
// If you are reading this in the future and subset types exist, refactor this code.
export interface SequenceOptions {
  color?: Color;
  name?: string;
  body?: Step[];
  dirty?: boolean;
}

export type possibelKind = "move_absolute"
                          | "move_relative"
                          | "write_pin"
                          | "read_pin"
                          | "wait"
                          | "send_message"
                          | "execute"
                          | "if_statement"


/* Step */
export interface Step extends BasicNode {
  kind: possibelKind;
  args: {};
};


export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};

interface MoveAbsoluteNode extends Step {
  kind: "move_absolute";
  args: {
    x: IntegerNode | number;
    y: IntegerNode | number;
    z: IntegerNode | number;
    speed: IntegerNode | number;
  };
}

interface MoveRelativeNode extends Step {
  kind: "move_relative";
  args: {
    x: IntegerNode | number;
    y: IntegerNode | number;
    z: IntegerNode | number;
    speed: IntegerNode | number;
  };
}

interface WritePinNode extends Step {
  kind: "write_pin";
  args: {
    pin_number: IntegerNode | number;
    pin_value: IntegerNode | number;
    pin_mode: IntegerNode | number;
  };
}

interface ReadPinNode extends Step {
  kind: "read_pin";
  args: {
    pin_number: IntegerNode | number;
    data_label: StringNode | string;
  };
}

interface WaitNode extends Step {
  kind: "wait";
  args: {
    milliseconds: IntegerNode | number;
  };
}

interface SendMessageNode extends Step {
  kind: "send_message";
  args: {
    message: StringNode | string;
  };
}

interface ExecuteNode extends Step {
  kind: "execute";
  args: {
    sub_sequence_id: IntegerNode | number;
  };
}

interface IfStatementNode extends Step {
  kind: "if_statement";
  args: {
    lhs: userVariables | number
    op: ">" | "<" | "is" | "not";
    rhs: IntegerNode | number;
    sub_sequence_id: IntegerNode | number;
  };
}

export type SequenceStepNode = MoveAbsoluteNode
                      | MoveRelativeNode
                      | WritePinNode
                      | ReadPinNode
                      | WaitNode
                      | SendMessageNode
                      | ExecuteNode
                      | IfStatementNode;

export interface SequenceNode extends BasicNode {
  kind: "sequence";
  // Just an example- we don't need this today, but it's on the calendar.
  args: { };
  // Body isn't optional for this one. Remove the "?" when refining.
  body: BasicNode[];
};
