import * as _ from "lodash";
import * as $ from "jquery";

export class Device {
  static fetch = function() {
    return $.ajax({
      method: "GET",
      url: "//THIS_URL_MUST_CHANGE" + "/api/device"
    });
  };

  static save = function (that) {
    return $.ajax({
      method: "POST",
      url: "//THIS_URL_MUST_CHANGE" + "/api/device",
      data: that
    });
  };

  static destroy = function (that) {
    return $.ajax({
      method: "DELETE",
      url: "//THIS_URL_MUST_CHANGE" + "/api/device"
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
