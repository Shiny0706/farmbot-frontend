import { settingToggle, settingToggleOk } from "../../actions/bot_actions";
import { devices } from "../../device";

let createSpy = jasmine.createSpy;

// export function settingToggle(name, bot) {
//     return function(dispatch) {
//         let currentValue = bot.hardware[name];
//         return devices
//           .current
//           .updateCalibration({ [name]: (currentValue === 0) ? ON : OFF })
//           .then(res => dispatch(settingToggleOk(res)),
//                 err => dispatch(settingToggleErr(err)));
//     };
// }

describe("bot actions", () => {
  it("toggles settings", (done) => {
    spyOn(devices.current, "updateCalibration")
      .and
      .returnValue(Promise.resolve({result: {}}));

    let bot = {
      hardware: {
        example: 1
      }
    };
    let thunk = settingToggle( "example", bot );
    let message = { example: 0 };
    let dispatch = jasmine.createSpy("dispatch");


    thunk(dispatch)
      .then(function(){
        expect(devices.current.updateCalibration).toHaveBeenCalledWith(message);
        expect(dispatch).toHaveBeenCalledWith(settingToggleOk({result: {}}));
        done();
      });

  });
});
