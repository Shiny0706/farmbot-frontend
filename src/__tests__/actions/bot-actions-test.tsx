import { settingToggle } from '../../actions/bot_actions';

let createSpy = window.jasmine.createSpy;

describe('bot_actions.js', () => {
  it('toggles settings', (done) => {
    let ok, no;

    let stubPromise = new Promise(function(resolve, reject) {
      ok = resolve;
      no = reject;
    });

    let stubBot = {
      updateCalibration: createSpy("updateCalibration").and.returnValue(stubPromise),
      hardware: {}
    };

    let stubResponse = {
      result: "XYZ"
    };

    let stubDispatch = createSpy("dispatch").and.callFake(x => x);
    let thunk = settingToggle("movement_invert_motor_y", stubBot);
    let result = thunk(stubDispatch);
    expect(result).toEqual(stubPromise);
    ok(stubResponse);
    result.then(function(action){
      expect(action.type).toEqual("SETTING_TOGGLE_OK");
      expect(action.payload).toEqual(stubResponse.result);
      done();
    });
  });
});
