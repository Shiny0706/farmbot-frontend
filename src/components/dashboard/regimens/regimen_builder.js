import React from 'react';
import { Navbar } from '../../../components/navbar';
import { OperationsWidget } from '../../../routes/dashboard/sequences/operations_widget';
import { SequencesWidget } from '../../../routes/dashboard/sequences/sequences_widget';
import { RegimensWidget } from '../../../routes/dashboard/regimens/regimens_widget';
import { RegimenEditorWidget } from '../../../routes/dashboard/regimens/regimen_editor_widget';

export var Regimens = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-md-offset-1 hidden-xs">
              <OperationsWidget/>
              <SequencesWidget/>
            </div>
            <div className="col-md-4 col-sm-12 hidden-xs">
              <RegimenEditorWidget/>
            </div>
            <div className="col-md-3 col-sm-12">
              <RegimensWidget/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
