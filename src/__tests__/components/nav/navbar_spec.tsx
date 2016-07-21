import * as React from "react";
import { Navbar } from "../../../components/nav/navbar.tsx";
import * as TUtils from "react-addons-test-utils";
import { Wrapper, fakeState } from "../../helpers";

console.log("Uh oh, tests are getting loaded!");

describe("Navbar component", () => {
  it("shows links and stuff", () => {
    let state = fakeState();
    let d = TUtils.renderIntoDocument(<Wrapper><Navbar {...state} /></Wrapper>);
    // TUtils.Simulate.click(d);
    expect(d).toBeDefined();
  });
});