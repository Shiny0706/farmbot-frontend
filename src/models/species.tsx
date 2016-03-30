let inc = 1;

Species.fakes = [
  (new Species({name: "Yowza Berries"}))
]

export function Species(opts) {
  opts = (opts || {});
  this.imgUrl = opts.imgUrl || '/img/placeholder_berries.jpg';
  this.name = opts.name || 'Unnamed Species';
  this._id  = String(opts._id || inc++);
}
