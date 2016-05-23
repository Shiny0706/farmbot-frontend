import * as React from "react";
import { RegimensState } from "../interfaces";
import { RegimenItemList } from "./regimen_item_list";

interface RegimenEditorWidgetProps {
  regimens: RegimensState;
}
export function RegimenEditorWidget({regimens}: RegimenEditorWidgetProps) {
    let regimen = regimens.all[regimens.current];

    return( <div>
              <div className="widget-wrapper regimen-editor-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <button className="green button-like widget-control">
                      Save
                    </button>
                    <button className="red button-like widget-control">
                      Delete
                    </button>
                    <div className="widget-header">
                      <h5>Regimen Editor</h5>
                      <i className="fa fa-question-circle widget-help-icon">
                        <div className="widget-help-text">Regimens allow FarmBot
                        to take care of a plant throughout its entire life. A
                        regimen consists of many sequences that are scheduled to run
                        based on the age of the plant. Regimens are applied to
                        plants from the farm designer and can be re-used on many
                        plants growing at the same or different times. Multiple
                        regimens can be applied to any one plant. Coming soon: Regimens!</div>
                      </i>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <input id="right-label"
                             placeholder="Regimen Name"
                             type="text"
                             defaultValue={ regimen.name }/>
                      <RegimenItemList items={ regimen.items } />
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
