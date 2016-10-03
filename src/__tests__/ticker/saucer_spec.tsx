import * as React from "react";
import { Saucer, SaucerProps } from "../../ticker/saucer";
import * as TUtils from "react-addons-test-utils";
import { Wrapper } from "../helpers";

describe("Saucer", () => {
  it("defaults to gray", () => {
    let JSXElem  = <Wrapper><Saucer /></Wrapper>;
    let ReactComponent = TUtils.renderIntoDocument(JSXElem) as React.Component<SaucerProps, {}>;
    let DOMElem = TUtils.findRenderedDOMComponentWithClass(ReactComponent, "saucer");
    let style = (DOMElem as any)["style"] as {background: string};
    expect(style.background).toEqual("gray",
      "If unset, the `color` attribute must default to gray.");
  });

  it("allows other colors, too.", () => {
    let JSXElem  = <Wrapper><Saucer color="red" /></Wrapper>;
    let ReactComponent = TUtils.renderIntoDocument(JSXElem) as React.Component<SaucerProps, {}>;
    let DOMElem = TUtils.findRenderedDOMComponentWithClass(ReactComponent, "saucer");
    let style = (DOMElem as any)["style"] as {background: string};
    expect((style).background).toEqual("red",
      "<Saucer/> must accept a `color` attribute that changes el.style.background.");
  });
});
