import * as React from "react";
import { TickerState } from "./interfaces";

interface TickerParams {
  ticker: TickerState;
}

export function Ticker({ ticker }: TickerParams) {
  let style = { background: "gray", transition: "all 0.5s ease" };
  style.background = ticker.color || "gray";

  return <div className="status-ticker-wrapper">
    <div className="status-ticker-light" style={style} />
    <label className="status-ticker-message"> { ticker.message || "Loading" } </label>
  </div>;
};
