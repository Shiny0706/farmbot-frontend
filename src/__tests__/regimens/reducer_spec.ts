import { regimensReducer as reduce  } from "../../regimens/reducer";
import { newRegimen } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";

describe("Config reducer", function() {
  let initialState: RegimensState;
  beforeEach(() => {
    initialState = { all: [],
                     current: 0 };
  });

  it("Adds a new empty Regimen", () => {
    expect(initialState.all.length).toEqual(0);
    let result = reduce(initialState, newRegimen());
    expect(result.all.length).toEqual(1);
    let reg = result.all[0];
    expect(reg.dirty).toBeTruthy;
    expect(reg.name).toEqual("Untitled Regimen");
    expect(reg.regimen_items.length).toBe(0);
  });
});
