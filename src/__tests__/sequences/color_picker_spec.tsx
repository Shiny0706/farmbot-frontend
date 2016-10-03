import { ColorPicker } from "../../sequences/color_picker";
import { Saucer } from "../../ticker/saucer";
import { colors } from "../../util";
import * as React from "react";
import { mount } from "enzyme";

describe("Color picker", () => {
  it("initializes.", function() {
    let colpik = new ColorPicker({current: "red"});
    expect(colpik.state.isHovered).toBeFalsy(
        "ColorPicker.state.isHovered should initialize to 'false'.");
    expect(colpik.notHovered()).toEqual(<div/>,
      "#notHovered() should return an empty div");
    let hovered = colpik.isHovered();
    expect(hovered.props.className).toEqual("colorpicker-text");
    let actualColors = hovered.props.children.map((c: JSX.Element) => (
      c.props.children.props.color
    )).sort();

    expect(actualColors).toEqual(colors.sort());
  });

  it("picks colors.", () => {
  // Render
    let callback = jasmine.createSpy("<ColorPicker/> onChange property");
    let el = mount(<ColorPicker current="red" onChange={ callback }/>);

  function saucerCount() { return el.find(".saucer").length; }
  // Unhovered
    expect(saucerCount()).toEqual(1,
      "Color picker shows 1 color saucer when unhovered.");

  // hover
    el.simulate("mouseEnter");
    expect(saucerCount()).toEqual((colors.length + 1),
      "Color picker shows all possible colors (plus current choice) when unhovered.");

  // Select a color
    let saucer = el.find(".saucer").last();
    let color = (saucer.props().style as any)["background"];
    saucer.simulate("click");
    expect(callback).toHaveBeenCalledWith(color);

  // unhover
      el.simulate("mouseLeave");
      expect(saucerCount()).toEqual(1,
        "Color picker shows 1 color saucer when unhovered.");
  });
});
