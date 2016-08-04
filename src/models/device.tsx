import * as _ from "lodash";
import * as $ from "jquery";

// This class is a remnant of an old architecture (MVC vs. Redux).
// It must be removed, but is still in use.
// Don't add anything new to this class.
// Try to remove it from the project if possible.
export class Device {
  static save = function (that) {
    return $.ajax({
      method: "POST",
      url: "//THIS_URL_MUST_CHANGE" + "/api/device",
      data: that
    });
  };

  public _id: String;
  public name: String;

  constructor (opts) {
    let options = (opts || {});
    this._id  = String(options._id || _.random(0, 1000));
    this.name = (options.name || "Untitled Device");
  };
};
