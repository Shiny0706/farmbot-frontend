import  _  from 'lodash';

export class Plant {
  constructor(options) {
    this.name = (options.name || "Untitled Crop");
    this.age  = (options.age || _.random(0, 5));
    this._id  = (options._id || _.random(0, 1000));
    this.imgUrl = (options.imgUrl || "/img/unknown.svg");
  }
};


Plant.fakePlants = [
  new Plant({name: "Blueberry", imgUrl: "/img/blueberry.svg"}),
  new Plant({name: "Cabbage", imgUrl: "/img/cabbage.svg"}),
  new Plant({name: "Pepper", imgUrl: "/img/pepper.svg"}),
  new Plant({name: "Cilantro", imgUrl: "/img/cilantro.svg"}),
];
