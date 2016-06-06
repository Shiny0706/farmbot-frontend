let inc = 1;

export class Species {
  static fakes = [
    (new Species({name: "Yowza Berries"}))
  ];

  public imgUrl: String;
  public name: String;
  public _id: String;

  constructor (opts) {
    opts = (opts || {});
    this.imgUrl = opts.imgUrl || "http://placehold.it/200x150";
    this.name = opts.name || "Unnamed Species";
    this._id  = String(opts._id || inc++);
  }
};
