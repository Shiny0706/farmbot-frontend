import * as React from 'react';
import { Navbar } from '../../../components/navbar';
import { OperationsWidget } from '../../../routes/dashboard/sequences/operations_widget';
import { SequencesWidget } from '../../../routes/dashboard/sequences/sequences_widget';
import { SequenceEditorWidget } from '../../../routes/dashboard/sequences/sequence_editor_widget';

export let Sequences = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <OperationsWidget />
            </div>
            <div className="col-md-6 col-sm-12">
              <SequenceEditorWidget />
            </div>
            <div className="col-md-3 col-sm-12">
              <SequencesWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
