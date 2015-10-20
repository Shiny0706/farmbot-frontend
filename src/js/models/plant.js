import  _  from 'lodash';

export class Plant {
  constructor(options) {
    this._id  = (options._id || _.random(0, 1000));
    this.age  = (options.age || _.random(0, 5));
    this.imgUrl = (options.imgUrl || "/img/unknown.svg");
    this.name = (options.name || "Untitled Plant");
    this.x = (options.x || 0);
    this.y = (options.y || 0);
  }
};


Plant.fakePlants = [
  new Plant({name: "Blueberry", imgUrl: "/img/blueberry.svg"}),
  new Plant({name: "Cabbage", imgUrl: "/img/cabbage.svg"}),
  new Plant({name: "Pepper", imgUrl: "/img/pepper.svg"}),
  new Plant({name: "Cilantro", imgUrl: "/img/cilantro.svg"}),
];
