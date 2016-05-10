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
    this.imgUrl = opts.imgUrl || "/img/placeholder_berries.jpg";
    this.name = opts.name || "Unnamed Species";
    this._id  = String(opts._id || inc++);
  }
};
