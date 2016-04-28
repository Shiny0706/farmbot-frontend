import * as _ from "lodash";
import * as $ from "jquery";

let fakeHeaders = { // TODO: Add auth scheme.
      bot_uuid: "c3c854e5-5508-49f9-8348-725bee7d392c",
      bot_token: "2649365c72ae225ef5cdfe208a4462eb0a11a1fc"
};

export class Plant {
  static designerUrl = function(plant) {
    return "/dashboard/designer?p1=PlantInfo" +
           "&id=" + plant._id;
  };

  static fakes = [
    new Plant({name: "Blueberry", imgUrl: "/img/blueberry.svg"}),
    new Plant({name: "Cabbage", imgUrl: "/img/cabbage.svg"}),
    new Plant({name: "Pepper", imgUrl: "/img/pepper.svg"}),
    new Plant({name: "Cilantro", imgUrl: "/img/cilantro.svg"}),
  ];

  static fetchAll = function() {
    return $.ajax({
      method: "GET",
      headers: fakeHeaders,
      url: "//THIS_URL_MUST_CHANGE" + "/api/plants"
    });
  };

  static save(that) {
    return $.ajax({
      method: "POST",
      headers: fakeHeaders,
      url: "//THIS_URL_MUST_CHANGE" + "/api/plants",
      data: that
    });
  };

  static destroy(that) {
    return $.ajax({
      method: "DELETE",
      url: "//THIS_URL_MUST_CHANGE" + "/api/plants/" + that._id
    });
  };

  public _id: String;
  public age: Number;
  public imgUrl: String;
  public name: String;
  public x: Number;
  public y: Number;

  constructor(opts) {
    let options = (opts || {});
    this._id  = String(options._id || _.random(0, 1000));
    this.age  = (options.age || _.random(0, 5));
    this.imgUrl = (options.imgUrl || "/img/unknown.svg");
    this.name = (options.name || "Untitled Plant");
    this.x = (options.x || 0);
    this.y = (options.y || 0);
  }
};
