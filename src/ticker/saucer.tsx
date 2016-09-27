import * as React from "react";

export interface SaucerProps {
  color?: string;
};


export /** A colored UI disc/circle. */
  function Saucer({ color }: SaucerProps) {
    let style = { transition: "all 0.5s ease", background: (color || "gray") };
    return <div className="saucer" style={ style } />;
}
