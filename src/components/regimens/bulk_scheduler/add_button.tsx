import * as React from "react";
import { Regimen } from "../interfaces";

interface AddButtonProps {
  dispatch: Function;
  regimen?: Regimen;
}

export function AddButton({regimen}: AddButtonProps) {
  if (!regimen) { return <div />; }
  return <button className="green button-like widget-control">
          Add
      </button>;

}
