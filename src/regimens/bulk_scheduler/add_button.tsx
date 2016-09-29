import * as React from "react";
import { t } from "i18next";

interface AddButtonProps {
  active: boolean;
  click: React.EventHandler<React.FormEvent>;
}

export function AddButton({active, click}: AddButtonProps) {
  if (!active) { return <div />; }
  return <button className="green button-like widget-control" onClick={ click }>
          {t("Add")}
         </button>;

}
