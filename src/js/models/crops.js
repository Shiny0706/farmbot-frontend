import  _  from 'lodash';

export class Crop {
  constructor(options) {
    this.name = (options.name || "Untitled Crop");
    this.age  = (options.age || _.random(0, 5));
    this._id  = (options._id || _.random(0, 1000));
    this.imgUrl = (options.imgUrl || "/img/unknown.svg");
  }
};


Crop.fakeCrops = [
  new Crop({name: "Blueberry", imgUrl: "/img/blueberry.svg"}),
  new Crop({name: "Cabbage", imgUrl: "/img/cabbage.svg"}),
  new Crop({name: "Pepper", imgUrl: "/img/pepper.svg"}),
  new Crop({name: "Cilantro", imgUrl: "/img/cilantro.svg"}),
];
