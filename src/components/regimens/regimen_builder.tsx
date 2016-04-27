import * as React from "react";
import { Navbar } from "../../components/navbar";
import { StepButtonGroup } from "../sequences/step_button_group";
import { SequencesWidget } from "../sequences/sequences_widget";
import { RegimensWidget } from "./regimens_widget";
import { RegimenEditorWidget } from "./regimen_editor_widget";

export let Regimens = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-md-offset-1 hidden-xs">
              <StepButtonGroup { ...this.props }/>
              <SequencesWidget />
              <SequencesWidget/>
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
