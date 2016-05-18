import * as React from "react";
import { Navbar } from "../nav/navbar";
import { BulkSchedulerWidget } from "./bulk_scheduler_widget";
import { RegimensWidget } from "./regimens_widget";
import { RegimenEditorWidget } from "./regimen_editor_widget";
import { SequenceReducerState } from "../sequences/interfaces";
import { AuthToken } from "../auth/auth_actions";
import { connect } from "react-redux";

interface RegimenProps {
  sequences: SequenceReducerState;
  dispatch: Function;
  auth: AuthToken;
}

class XRegimens extends React.Component<RegimenProps, {}> {
  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-md-offset-1 hidden-xs">
              <BulkSchedulerWidget />
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
}

export let Regimens = connect(state => state)(XRegimens);
