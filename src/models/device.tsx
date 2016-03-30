import * as _ from 'lodash';
import * as $ from 'jquery';
import { CONFIG } from '../config'


Device.fetch = function() {
  return $.ajax({
    method: "GET",
    url: CONFIG.FARMBOT_API_URL + "/api/device"
  });
};

Device.save = function (that) {
  return $.ajax({
    method: "POST",
    url: CONFIG.FARMBOT_API_URL + "/api/device",
    data: that
  });
};

Device.destroy = function (that) {
  return $.ajax({
    method: "DELETE",
    url: CONFIG.FARMBOT_API_URL + "/api/device"
  });
}

export function Device (options) {
  let options = (options || {});
  this._id  = String(options._id || _.random(0, 1000));
  this.name = (options.name || "Untitled Device");
};
