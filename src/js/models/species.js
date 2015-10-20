Species.fakes = [
  (new Species({name: "Yowza Berries"}))
]

export function Species(opts) {
  opts = (opts || {});
  this.imgUrl = opts.imgUrl || '/img/placeholder_berries.jpg';
  this.name = 'Unnamed Species';
}
