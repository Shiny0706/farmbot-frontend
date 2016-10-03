import { devices } from "../../device";

// let createSpy = jasmine.createSpy;

describe("bot actions", () => {
  xit("toggles settings", (done) => {
    spyOn(devices.current, "updateCalibration")
      .and
      .returnValue(Promise.resolve({ result: {} }));


    let bot = {
      hardware: {
        example: 1
      },
      account: {
        id: 0,
        uuid: "loading...",
        name: "loading..."
      },
      logQueueSize: 10,
      logQueue: [],
      status: "NOT READY",
      stepSize: 1000,
      axisBuffer: {},
      settingsBuffer: {}
    };

    // let thunk = settingToggle("speed", bot);
    // let message = { example: 0 };
    // let dispatch = jasmine.createSpy("dispatch");

    // thunk(dispatch)
    //   .then(function () {
    //     expect(devices.current.updateCalibration).toHaveBeenCalledWith(message);
    //     // expect(dispatch).toHaveBeenCalledWith(settingToggleOk({ result: {} }));
    //     done();
    //   });

  });
});
