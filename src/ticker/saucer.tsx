import * as React from "react";

export interface SaucerProps {
  color?: string;
  border?: string;
};


export /** A colored UI disc/circle. */
  function Saucer({ color, border }: SaucerProps) {
    let style = { transition: "all 0.5s ease", background: (color || "gray") };
    if (border) { style["border"] = `3px solid ${ border }`; }
    return <div className="saucer" style={ style } />;
}
