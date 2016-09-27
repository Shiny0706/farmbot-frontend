import * as React from "react";
import { Saucer } from "../ticker/saucer";
import { Color } from "../interfaces";
import { colors } from "../util";

export interface ColorPickerProps {
    current: Color;
}

export function ColorPicker({ current }: ColorPickerProps) {
    return (<div>
        <Saucer color={ current } />
    </div>);
}

// <div className="help-text">
//     {
//         colors.map(c => <Saucer color={c} />)
//     }
// </div>