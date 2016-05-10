export class Schedule {
  static fakes = [
    (new Schedule({desc: "Photos", time: new Date("02-27-2015 06:00")})),
    (new Schedule({desc: "Weeding", time: new Date("02-28-2015 07:00")})),
    (new Schedule({desc: "Spectral blah this is a long event title",
                   time: new Date("02-28-2015 09:00")}))
  ];

  public time: Date;
  public desc: String;
  public icon: String;

  constructor(options) {
    options = (options || {});
    this.time = (options.time || new Date());
    this.desc = (options.desc || "Untitled Event");
    this.icon = (options.icon || "fa-trees");
  }

  formatTime() {
    let hours = this.time.getHours();
    return `${hours} ${(hours > 12) ? "a" : "p"}`;
  };

  hasPassed() {
    return this.time < new Date();
  };

};
