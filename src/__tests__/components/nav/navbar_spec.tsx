import * as React from "react";
import { LogoutButton } from "../../../nav/navbar.tsx";
import * as TUtils from "react-addons-test-utils";
import { Wrapper, fakeState } from "../../helpers";

describe("Navbar component", () => {
  it("has a callback", () => {
    let props = {auth: fakeState().auth, onClick: jasmine.createSpy("LogoutButton onClick()")}
    let JSXElem  = <Wrapper><LogoutButton {...props} /></Wrapper>;
    let ReactComponent = TUtils.renderIntoDocument(JSXElem) as React.Component<any, any>;
    let DOMElem = TUtils.findRenderedDOMComponentWithTag(ReactComponent, "a");

    expect(props.onClick).not.toHaveBeenCalled();
    TUtils.Simulate.click(DOMElem);
    expect(props.onClick).toHaveBeenCalled();
  });

  it("renders a span if not logged in", () => {
    let auth = fakeState().auth;
    auth.authenticated = false; // pretend we're logged out.
    let props = {auth}
    let JSXElem  = <Wrapper><LogoutButton {...props} /></Wrapper>;
    let ReactComponent = TUtils.renderIntoDocument(JSXElem) as React.Component<any, any>;
    let DOMElem = TUtils.findRenderedDOMComponentWithTag(ReactComponent, "span");
    expect(DOMElem.innerHTML).toBeFalsy();
  });

  it("renders a link if logged in", () => {
    let auth = fakeState().auth;
    auth.authenticated = true; // pretend we're logged in.
    let props = {auth};
    let JSXElem  = <Wrapper><LogoutButton {...props} /></Wrapper>;
    let ReactComponent = TUtils.renderIntoDocument(JSXElem) as React.Component<any, any>;
    let DOMElem = TUtils.findRenderedDOMComponentWithTag(ReactComponent, "a");

    expect(DOMElem.innerHTML).toContain("Log Out");
  });

});
