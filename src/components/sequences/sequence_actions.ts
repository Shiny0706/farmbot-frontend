
export interface EditCurrentSequence {
  type: "EDIT_CURRENT_SEQUENCE";
  payload: {
    name?: String;
  };
};

export function editCurrentSequence(updates): EditCurrentSequence {
  return {
    type: "EDIT_CURRENT_SEQUENCE",
    payload: updates
  };
}

export interface PushStep {
  type: "PUSH_STEP";
  payload: Step;
}

export function pushStep(step: Step): PushStep {
  return {
    type: "PUSH_STEP",
    payload: step
  };
}
