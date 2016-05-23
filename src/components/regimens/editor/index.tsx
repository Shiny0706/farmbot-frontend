import * as React from "react";
import { RegimensState } from "../interfaces";
import { RegimenItemList } from "./regimen_item_list";
import { RegimenNameInput } from "./regimen_name_input";
import { SaveButton } from "./save_button";
import { DeleteButton } from "./delete_button";
import { emptyRegimen } from "../reducer";

interface RegimenEditorWidgetProps {
  regimens: RegimensState;
  dispatch: Function;
}
export function RegimenEditorWidget({regimens, dispatch}: RegimenEditorWidgetProps) {
    let regimen = regimens.all[regimens.current] || emptyRegimen();
    return( <div>
              <div className="widget-wrapper regimen-editor-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <SaveButton regimen={ regimen } dispatch={ dispatch } />
                    <DeleteButton regimen={ regimen } dispatch={ dispatch } />
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
                      <RegimenNameInput regimen={ regimen } dispatch={ dispatch } />
                      <RegimenItemList items={ regimen.items } />
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
