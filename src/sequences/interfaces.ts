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

/** Similar to "Step", but "position" isnt mandatory. */
export interface UnplacedStep extends BasicNode {
  kind: string;
  args: {};
  position?: number;
};

/** One step in a larger "Sequence". */
export interface Step extends UnplacedStep {
  position: number;
};


export interface SequenceReducerState {
    all: Array<Sequence>;
    current: number;
};

interface MoveAbsoluteNode extends BasicNode {
  kind: "move_absolute";
  args: {
    x: IntegerNode;
    y: IntegerNode;
    z: IntegerNode;
    speed: IntegerNode;
  };
}

interface MoveRelativeNode extends BasicNode {
  kind: "move_relative";
  args: {
    x: IntegerNode;
    y: IntegerNode;
    z: IntegerNode;
    speed: IntegerNode;
  };
}

interface WritePinNode extends BasicNode {
  kind: "write_pin";
  args: {
    pin_number: IntegerNode;
    pin_value: IntegerNode;
    pin_mode: IntegerNode;
  };
}

interface ReadPinNode extends BasicNode {
  kind: "read_pin";
  args: {
    pin_number: IntegerNode;
    data_label: StringNode;
  };
}

interface WaitNode extends BasicNode {
  kind: "wait";
  args: {
    milliseconds: IntegerNode;
  };
}

interface SendMessageNode extends BasicNode {
  kind: "send_message";
  args: {
    message: StringNode;
  };
}

interface ExecuteNode extends BasicNode {
  kind: "execute";
  args: {
    sub_sequence_id: IntegerNode;
  };
}

interface IfStatementNode extends BasicNode {
  kind: "if_statement";
  args: {
    lhs: userVariables
    op: ">" | "<" | "is" | "not";
    rhs: IntegerNode;
    sub_sequence_id: IntegerNode;
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
