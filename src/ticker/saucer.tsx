import * as React from "react";
import { defensiveClone } from "../util";

export interface SaucerProps {
  color?: string;
  border?: string;
  style?: {[k: string]: string};
};

export /** A colored UI disc/circle. */
  function Saucer({ color, border, style }: SaucerProps) {
    style = defensiveClone<{[k: string]: string}>(style || {});
    _.assign(style, { transition: "all 0.5s ease", background: (color || "gray") });
    if (border) { (style || {})["border"] = `3px solid ${ border }`; }
    return <div className="saucer" style={ style } />;
}
