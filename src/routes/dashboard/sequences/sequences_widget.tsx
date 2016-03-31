import * as React from 'react';

export class SequencesWidget extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="widget-wrapper sequences-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5>Sequences</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <div className="block-wrapper">
                        <div>
                          <button className="block full-width text-left purple-block block-header">
                            Untitled Sequence
                            <i className="fa fa-arrows block-control" />
                            <i className="fa fa-pencil block-control" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
}
