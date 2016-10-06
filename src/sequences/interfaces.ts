import { userVariables as FarmBotJsuserVariables } from "farmbot/interfaces";
import { BasicNode } from "../ast/interfaces";
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
    x: number;
    y: number;
    z: number;
    speed: number;
  };
}

interface MoveRelativeNode extends BasicNode {
  kind: "move_relative";
  args: {
    x: number;
    y: number;
    z: number;
    speed: number;
  };
}

interface WritePinNode extends BasicNode {
  kind: "write_pin";
  args: {
    pin_number: number;
    pin_value: number;
    pin_mode: 0 | 1;
  };
}

interface ReadPinNode extends BasicNode {
  kind: "read_pin";
  args: {
    pin_number: number;
    data_label: string;
  };
}

interface WaitNode extends BasicNode {
  kind: "wait";
  args: {
    milliseconds: number;
  };
}

interface SendMessageNode extends BasicNode {
  kind: "send_message";
  args: {
    message: string;
  };
}

interface ExecuteNode extends BasicNode {
  kind: "execute";
  args: {
    sub_sequence_id: number;
  };
}

interface IfStatementNode extends BasicNode {
  kind: "if_statement";
  args: {
    lhs: userVariables
    op: ">" | "<" | "is" | "not";
    rhs: number;
    sub_sequence_id: number;
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
}