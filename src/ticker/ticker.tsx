import * as React from "react";
import { TickerState } from "./interfaces";
import { Saucer } from "./saucer";
import { t } from "i18next";

interface TickerParams {
  ticker: TickerState;
}

export function Ticker({ ticker }: TickerParams) {

  return <div className="status-ticker-wrapper">
    <Saucer color={ ticker.color } />
    <label className="status-ticker-message">
      { ticker.message || t("Loading") }
    </label>
  </div>;
};
