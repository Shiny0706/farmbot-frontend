import _ from 'lodash';
import $ from 'jquery';
import { CONFIG } from '../config'

Plant.fakePlants = [
  new Plant({name: "Blueberry", imgUrl: CONFIG.ROOT_URL + "/img/blueberry.svg"}),
  new Plant({name: "Cabbage", imgUrl: CONFIG.ROOT_URL + "/img/cabbage.svg"}),
  new Plant({name: "Pepper", imgUrl: CONFIG.ROOT_URL + "/img/pepper.svg"}),
  new Plant({name: "Cilantro", imgUrl: CONFIG.ROOT_URL + "/img/cilantro.svg"}),
];

Plant.save = function (that) {
  return $.ajax({
    method: "POST",
    headers: {
      bot_uuid: "c3c854e5-5508-49f9-8348-725bee7d392c",
      bot_token: "2649365c72ae225ef5cdfe208a4462eb0a11a1fc"
    },
    url: CONFIG.FARMBOT_API_URL + "/api/plants",
    data: that
  });
};

Plant.destroy = function (that) {
  return $.ajax({
    method: "DELETE",
    url: CONFIG.FARMBOT_API_URL + "/api/plants/" + that._id
  });
}

export function Plant (options) {
  this._id  = (options._id || _.random(0, 1000));
  this.age  = (options.age || _.random(0, 5));
  this.imgUrl = (options.imgUrl || "/img/unknown.svg");
  this.name = (options.name || "Untitled Plant");
  this.x = (options.x || 0);
  this.y = (options.y || 0);
};
