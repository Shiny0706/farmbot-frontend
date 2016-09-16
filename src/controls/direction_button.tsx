import * as React from "react";
import { sendCommand } from "../devices/actions";

export class DirectionButton extends React.Component<any, any> {
  sendCommand() {
    let payload = { name: "moveRelative", speed: 100 };
    let isNegative = (this.props.direction === "up") ||
                      (this.props.direction === "right");
    let multiplier = (isNegative) ? -1 : 1;
    (payload as any)[this.props.axis] = (this.props.steps || 250 ) * multiplier;
    this.props.dispatch(sendCommand(payload));
  }

  render() {
    let classes =
      "button-like fa fa-2x arrow-button radius fa-arrow-" +
      this.props.direction;
    return <button onClick={this.sendCommand.bind(this)}
                   className={classes}>
             <i />
           </button>;
  }
}
