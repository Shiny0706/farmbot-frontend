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

  formatMs(ms: number) {
    if (_.isNumber(ms)) { // Way to much logic. 
      let d = duration(ms);
      let isPM = (d.hours() > 12);
      let hh = (isPM) ? (d.hours() - 12) : d.hours();
      let h = _.padLeft(hh.toString(), 2, "0");
      let m = _.padLeft(d.minutes().toString(), 2, "0");
      return `${ h }:${ m } ${ isPM ? "PM" : "AM" }`;
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

  blur (dispatch: Function) {
    return (event: React.FormEvent) => {
      dispatch(setTimeOffset((event.target as any).value));
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
                 val: (event.target as any).value
               });
             }}
             onBlur={ this.blur(this.props.dispatch).bind(this) }/>
    </div>;
  }
}
