import * as React from "react";
import { Navbar } from "../../components/navbar";
import { SequencesList } from "./sequences_list";
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
              <SequencesList { ...this.props }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
