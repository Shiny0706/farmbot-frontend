import { ColorPicker } from "../../sequences/color_picker";
import { Saucer } from "../../ticker/saucer";
import { colors } from "../../util";
import * as TestUtils from "react-addons-test-utils";
import * as React from "react";

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
    pending("Maybe I'll just use enzyme....");
    // Render
    let callback = jasmine.createSpy("<ColorPicker/> onChange property");
    const renderer = TestUtils.createRenderer();
    renderer.render(<ColorPicker current="red" onChange={ callback }/>);
    let a = <div>
            <Saucer/>
            <div/>
        </div>;
    let b = renderer.getRenderOutput();
    expect(a).toEqual(b);
    // hover

    // Select a color

  });
});
