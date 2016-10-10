import * as React from "react";
import { Step } from "./interfaces";
import { addComment } from "./actions";

interface StepTitleBarProps {
  step: Step;
  index: number;
  dispatch: Function;
}

export class StepTitleBar extends React.Component<StepTitleBarProps, {}> {

  onChange(e: React.FormEvent) {
    let target = e.target as HTMLInputElement;
    let { step, index, dispatch } = this.props;
    dispatch(addComment(step, index, target.value));
  }

  render( ) {
    return <input className="step-label"
                  placeholder={ this.props.step.kind }
                  onChange={ this.onChange.bind(this) }/>;
  };
};
