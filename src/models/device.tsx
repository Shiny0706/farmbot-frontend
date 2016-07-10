import * as _ from "lodash";
import * as $ from "jquery";

export class Device {
  static save = function (that) {
    // TODO: Remove JQuery here in favor of Axios.
    // Actually, forget this whole class!
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
