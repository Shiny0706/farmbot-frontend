import * as React from "react";
import { Navbar } from "../../components/navbar";
import { SequencesWidget } from "./sequences_widget";
import { StepButtonGroup } from "./step_button_group";
import { SequenceEditorWidget } from "./sequence_editor_widget";
import { connect } from "react-redux";

@connect(state => state)
export class Sequences  extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <StepButtonGroup { ...this.props }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SequenceEditorWidget { ...this.props } />
            </div>
            <div className="col-md-3 col-sm-12">
              <SequencesWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
