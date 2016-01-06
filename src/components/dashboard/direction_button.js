import React from 'react';
import { sendCommand } from '../../actions/bot_actions';

export class DirectionButton extends React.Component {
  sendCommand() {
    var payload = { name: "moveRelative", speed: 100 };
    var isNegative = (this.props.direction == "up") ||
                      (this.props.direction == "right");
    var multiplier = (isNegative) ? -1 : 1;
    payload[this.props.axis] = (this.props.steps || 250 ) * multiplier;
    this.props.dispatch(sendCommand(payload));
  }

  render() {
    var classes =
      "button-like fa fa-2x arrow-button radius fa-arrow-" +
      this.props.direction;
    return <button onClick={this.sendCommand.bind(this)}
                   className={classes}>
             <i />
           </button>
  }
}

