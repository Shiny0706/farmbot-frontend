import * as React from "react";
import { setTimeOffset } from "./actions";
import { duration } from "moment";

interface TimeInputProps {
  dispatch: Function;
  /** milliseconds from midnight */
  offset: number;
}

// F it! I'm making this form control stateful. Stateless forms === brain surgery.
export class TimeInput extends React.Component<TimeInputProps, any> {
  public isEditing: boolean;

  formatMs(ms) {
    if (_.isNumber(ms)) {
      let d = duration(ms);
      let isPM = (d.hours() > 12);
      let hh = d.hours();
      if (isPM) { hh -= 12; };
      return `${ hh }:${ d.minutes() } ${ isPM ? "PM" : "AM" }`;
    } else {
      return "10:26 AM";
    }
  }

  get value(): string {
    if (this.isEditing) {
      return this.state.val;
    } else {
      return this.formatMs(this.props.offset);
    }
  }

  focus() {
    this.isEditing = true;
  }

  blur (dispatch) {
    return (event) => {
      dispatch(setTimeOffset(event.target.value));
      this.isEditing = false;
    };
  }

  render() {
    return <div>
      <label>Time</label>
      <input onFocus={ this.focus.bind(this) }
             value={ this.value }
             onChange={ (event) => {
               this.setState({
                 val: event.target["value"]
               });
             }}
             onBlur={ this.blur(this.props.dispatch).bind(this) }/>
    </div>;
  }
}
