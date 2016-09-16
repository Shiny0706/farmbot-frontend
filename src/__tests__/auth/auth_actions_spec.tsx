import * as $ from "jquery";
import { didLogin } from "../../auth/actions";
import { fakeState } from "../helpers";
import { AuthState } from "../../auth/interfaces"


describe("Auth actions", () => {
  let authState: AuthState, dispatch: Function;

  beforeEach(() => {
    dispatch = jasmine.createSpy("dispatcher fn");
    authState = fakeState(dispatch).auth;
  });

  it("handles initial login", () => {
    spyOn($, "ajaxSetup"); // Stop AJAX.
    didLogin(authState, dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
