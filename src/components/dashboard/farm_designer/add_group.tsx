import * as React from 'react';
import { Link } from 'react-router';
import { BackArrow } from './back_arrow';

export class AddGroup extends React.Component<any, any> {
  render() {
    return  <div className="panel-container cyan-panel">
              <div className="panel-header cyan-panel">
                <p className="panel-title">
                  <BackArrow/>Add Group
                </p>
              </div>
              <div className="panel-content">
                <label>Name</label>
                <input placeholder="My new group"
                         type="text"
                         className="flex3"/>
                <label>Plants in this group</label>
                <p>Select from map to add</p>
                <label>Sub-Groups</label>
                <p>Select from map to add</p>
                <label>Parent-Groups</label>
                <p>Add parent groups</p>
                <button className="button-like cyan">
                  Save
                </button>
              </div>
            </div>;
  }
}
