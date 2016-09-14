import * as $ from "jquery";
import { didLogin,
  setToken } from "../../auth/actions";
import { fakeState } from "../helpers";


describe("Auth actions", () => {
  let authState, dispatch;

  beforeEach(() => {
    dispatch = jasmine.createSpy("dispatcher fn");
    authState = fakeState(dispatch).auth;
  });

  it("handles initial login", () => {
    spyOn($, "ajaxSetup"); // Stop AJAX.
    didLogin(authState, dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it("sets the API token on jquery", () => {
    let ajaxSetup = spyOn($, "ajaxSetup");
    let fakeToken = "---STUB-TOKEN---";
    setToken(fakeToken);
    expect(ajaxSetup).toHaveBeenCalled();
    // This is the config object that is *expected* to be
    // passed to jQuery.
    const conf = ajaxSetup.calls.mostRecent().args[0];
    let xhrObject = jasmine.createSpyObj("xhr", ["setRequestHeader"]);

    expect(conf.beforeSend).toBeDefined();
    expect(conf.beforeSend).toEqual(jasmine.any(Function));
    conf.beforeSend(xhrObject);
    expect(xhrObject.setRequestHeader)
      .toHaveBeenCalledWith("Authorization", fakeToken);
  });
});
