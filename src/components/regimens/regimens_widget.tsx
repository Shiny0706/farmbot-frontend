import * as React from 'react';

export class RegimensWidget extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="widget-wrapper regimens-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="main-nav-button">
                      <button className="navbar-toggle hidden-sm hidden-md hidden-lg" data-target="#navbar" data-toggle="collapse" type="button">
                        <span className="glyphicon glyphicon-menu-hamburger" />
                      </button>
                    </div>
                    <button className="green button-like widget-control">
                      Add
                    </button>
                    <div className="widget-header">
                      <h5>Regimens</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <div className="block-wrapper">
                        <div>
                          <button className="block full-width text-left purple-block block-header">
                            Untitled Regimen
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
