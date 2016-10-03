import * as React from "react";
import { Everything } from "../interfaces";
import { moveRelative } from "../devices/actions";

interface DirectionButtonProps extends Everything {
  axis: "x"|"y"|"z";
  direction: "up"|"down"|"left"|"right";
  steps: number;
}

export class DirectionButton extends React.Component<DirectionButtonProps, any> {
  sendCommand() {
    let isNegative = (this.props.direction === "up") ||
                      (this.props.direction === "right");
    let multiplier = (isNegative) ? -1 : 1;
    let distance = (this.props.steps || 250 ) * multiplier;
    let payload = { speed: 100, x: 0, y: 0, z: 0 };
    payload[this.props.axis] = distance;
    moveRelative(payload);
  }

  render() {
    let classes =
      "button-like fa fa-2x arrow-button radius fa-arrow-" +
      this.props.direction;
    return <button onClick={this.sendCommand.bind(this)}
                   className={classes}>
             <i/>
           </button>;
  }
}
