import { ColorPicker } from "../../sequences/color_picker";
import { Saucer } from "../../ticker/saucer";
import { colors } from "../../util";
import * as React from "react";
import { render } from "enzyme";

describe("Color picker", () => {
  it("initializes", function() {
    let colpik = new ColorPicker({current: "red"});
    expect(colpik.state.isHovered).toBeFalsy(
        "ColorPicker.state.isHovered should initialize to 'false'.");
    expect(colpik.notHovered()).toEqual(<div/>,
      "#notHovered() should return an empty div");
    let hovered = colpik.isHovered();
    expect(hovered.props.className).toEqual("colorpicker-text");
    let actualColors = hovered.props.children.map((c) => c.props.children.props.color).sort();
    expect(actualColors).toEqual(colors.sort());
  });

  it("picks a color", () => {
  // Render
    let callback = jasmine.createSpy("<ColorPicker/> onChange property");
    let huh = render(<ColorPicker current="red" />);

  // Unhovered
      debugger;

  // hover

  // Select a color

  });
});
