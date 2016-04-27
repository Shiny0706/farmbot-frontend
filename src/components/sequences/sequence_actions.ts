
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
  payload: {
    step: Step;
    index?: number;
  };
}

export function pushStep(step: Step, index?: number): PushStep {
  return {
    type: "PUSH_STEP",
    payload: {step, index}
  };
}

type CHANGE_STEP = "CHANGE_STEP";
export interface ChangeStep {
  type: CHANGE_STEP;
  payload: {
    step: Step;
    index: number;
  };
}

export function changeStep(index: number, step: Step): ChangeStep {
  return {
    type: "CHANGE_STEP",
    payload: {step, index}
  };
}

export interface RemoveStep {
  type: "REMOVE_STEP";
  payload: {
    index: number;
  };
};

export function removeStep(index: number): RemoveStep {
  return {
    type: "REMOVE_STEP",
    payload: {index}
  };
}
