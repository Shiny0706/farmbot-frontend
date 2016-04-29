import * as React from "react";
import { Navbar } from "../../components/navbar";
import { StepButtonGroup } from "../sequences/step_button_group";
import { SequencesList } from "../sequences/sequences_list";
import { RegimensWidget } from "./regimens_widget";
import { RegimenEditorWidget } from "./regimen_editor_widget";
import { Sequence } from "../sequences/interfaces";
// let nullSequence: Sequence = {
//   name: "Empty",
//   steps: [],
//   color: "red"
// };

export let Regimens = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-md-offset-1 hidden-xs">
              <StepButtonGroup { ...this.props } />
              <SequencesList { ...this.props } />
              <SequencesList { ...this.props } />
            </div>
            <div className="col-md-4 col-sm-12 hidden-xs">
              <RegimenEditorWidget />
            </div>
            <div className="col-md-3 col-sm-12">
              <RegimensWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
