import * as React from "react";
import { Saucer } from "../ticker/saucer";
import { Color } from "../interfaces";
import { colors } from "../util";

interface ColorPickerProps {
    current: Color;
    onChange?: (color: Color) => any;
}

interface ColorPickerState { isHovered: boolean; }

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

    constructor(props: ColorPickerProps) {
        super(props);
        this.state = { isHovered: false };
    }

    /** The output of this function is what the user will see when the
      color circle is hovered over. */
    isHovered({text}: { text: string }) {
        let actual = this.props.current;

        let cb = this.props.onChange || function(){ };

        function littleCircle(color: string, key: number) {

            let style = { margin: "4px" };

            if (color === actual) { style["border"] = "3px solid #666"; }

            function colorChange() { cb(color); }

            return <div key={key} onClick={colorChange} >
                <Saucer color={color} style={style} />
            </div>;
        }

        return <div className="colorpicker-text">
            {colors.map(littleCircle)}
        </div>;
    }

    /** This is what the user sees when the circle is not hovered over. */
    notHovered(props: ColorPickerProps) { return <div></div>; }

    render() {
        let Comp = (this.state.isHovered ? this.isHovered.bind(this) : this.notHovered);
        return <div onMouseEnter={() => { this.setState({ isHovered: true }); } }
            onMouseLeave={() => { this.setState({ isHovered: false }); } } >
            <Saucer color={this.props.current} />
            <Comp />
        </div>;
    };
}
