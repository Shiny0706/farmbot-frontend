import { regimensReducer as reduce  } from "../../regimens/reducer";
import { newRegimen, editRegimen } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";

describe("Regimen reducer", function() {
  let initialState: RegimensState;
  let regimen: Regimen;
  beforeEach(() => {
    regimen = {
            id: 123,
            name: "Whatevs",
            color: "red",
            regimen_items: [],
            dirty: false
        };
    initialState = { all: [regimen],
                     current: 0 };
  });

  it("Adds a new empty Regimen", () => {
    expect(initialState.all.length).toEqual(1);
    let result = reduce(initialState, newRegimen());
    expect(result.all.length).toEqual(2);
    let reg = result.all[1];
    expect(reg.dirty).toBeTruthy;
    expect(reg.name).toEqual("Untitled Regimen");
    expect(reg.regimen_items.length).toBe(0);
    expect(result.current).toEqual((result.all.length - 1),
      "When you add a new regimen, it should become the active regimen.");
  });

  it("edits a regimen", () => {
    expect(initialState.all.length).toEqual(1);
    let update = {color: "blue", name: "Something funny"};
    let result = reduce(initialState, editRegimen(regimen,
      update));
    let curReg = result.all[0];
    expect(curReg.color).toEqual(update.color);
    expect(curReg.name).toEqual(update.name);
  });

});
