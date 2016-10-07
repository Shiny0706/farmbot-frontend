export interface BasicNode {
  kind: string;
  args: {};
  body?: BasicNode[];
};

export interface StringNode extends BasicNode {
  kind: "literal";
  args: {
    data_type: "string",
    data_value: string,
  };
}

export interface IntegerNode extends BasicNode {
  kind: "literal";
  args: {
    data_type: "integer",
    data_value: string,
  };
}
