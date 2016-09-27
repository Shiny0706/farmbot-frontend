import * as React from "react";
import { Saucer } from "../ticker/saucer";
import { Color } from "../interfaces";
import { colors } from "../util";

interface ColorPickerProps { current: Color; }
interface ColorPickerState { isHovered: boolean; }

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

  constructor(props: ColorPickerProps) {
    super(props);
    this.state = { isHovered: false };
  }

  /** The output of this function is what the user will see when the
    color circle is hovered over. */
  isHovered({text}: { text: string }) {
    return <div>
      {
        colors.map((c, i) => <Saucer color={c} key={i} />)
      }
    </div>;
  }

  /** This is what the user sees when the circle is not hovered over. */
  notHovered(props: ColorPickerProps) { return <div></div>; }

  render() {
    let Comp = (this.state.isHovered ? this.isHovered : this.notHovered);
    return <div onMouseEnter={() => { this.setState({ isHovered: true }); } }
                onMouseLeave={() => { this.setState({ isHovered: false }); } } >
      <Saucer color={this.props.current} />
      <Comp />
    </div>;
  };
}
