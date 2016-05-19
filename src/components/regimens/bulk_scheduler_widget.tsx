import * as React from 'react';

export class BulkSchedulerWidget extends React.Component<any, any> {
  render() {
    return( <div>
              <div className="widget-wrapper bulk-scheduler-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <button className="green button-like widget-control">
                      Add to Regimen
                    </button>
                    <div className="widget-header">
                      <h5>Bulk Scheduler</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <div className="row">
                        <div className="col-sm-8">
                          <label>Sequence</label>
                          <select>
                            <option>Sequence 1</option>
                            <option>Sequence 2</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Time</label>
                          <input placeholder="10:00 AM"></input>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <label className="center margin-top">Days</label>
                          <div>
                            <input type="checkbox" id="all" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-1" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-2" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-3" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-4" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-5" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-6" className="bulk-day-selector" />
                            <input type="checkbox" id="every-7th-day-starting-with-day-7" className="bulk-day-selector" />
                          </div>
                          <div className="week-row">
                            <input type="checkbox" id="every-day-in-week-1" className="bulk-day-selector" />
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-1" className="day" />
                              <label className="day-label left-most" htmlFor="day-1">1</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-2" className="day" />
                              <label className="day-label" htmlFor="day-2">2</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-3" className="day" />
                              <label className="day-label" htmlFor="day-3">3</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-4" className="day" />
                              <label className="day-label" htmlFor="day-4">4</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-5" className="day" />
                              <label className="day-label" htmlFor="day-5">5</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-6" className="day" />
                              <label className="day-label" htmlFor="day-6">6</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-7" className="day" />
                              <label className="day-label right-most" htmlFor="day-7">7</label>
                            </div>
                          </div>
                          <div className="week-row">
                            <input type="checkbox" id="every-day-in-week-2" className="bulk-day-selector" />
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-8" className="day" />
                              <label className="day-label left-most" htmlFor="day-8">8</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-9" className="day" />
                              <label className="day-label" htmlFor="day-9">9</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-10" className="day" />
                              <label className="day-label" htmlFor="day-10">10</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-11" className="day" />
                              <label className="day-label" htmlFor="day-11">11</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-12" className="day" />
                              <label className="day-label" htmlFor="day-12">12</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-13" className="day" />
                              <label className="day-label" htmlFor="day-13">13</label>
                            </div>
                            <div className="day-selector-wrapper">
                              <input type="checkbox" id="day-14" className="day" />
                              <label className="day-label right-most" htmlFor="day-14">14</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );
  }
}
