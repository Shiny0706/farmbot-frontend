export function Schedule (options) {
  options = (options || {});
  this.time = (options.time || new Date());
  this.desc = (options.desc || "Untitled Event");
  this.icon = (options.icon || "fi-trees");
};

Schedule.prototype.formatTime = function() {
  var hours = this.time.getHours();
  return `${hours} ${(hours > 12) ? "AM" : "PM"}`;
};

Schedule.prototype.hasPassed = function () {
  return this.time < new Date();
};

Schedule.fakes = [
  (new Schedule({desc: "Photos", time: new Date("02-28-2015 06:00")})),
  (new Schedule({desc: "Weeding", time: new Date("02-28-2015 07:00")})),
  (new Schedule({desc: "Spectral", time: new Date("02-28-2015 09:00")}))
];
