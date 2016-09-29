import { regimensReducer as reduce } from "../../regimens/reducer";
import { newRegimen, editRegimen, removeRegimenItem } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";
import { findWhere } from "lodash";

describe("Regimen reducer", function () {
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
    initialState = {
      all: [regimen],
      current: 0
    };
  });

  it("deletes a single regimen_item from the list", () => {


    let before: any = {
      "all": [{
        "id": 1,
        "name": "Reggie McRegimen",
        "color": "red",
        "device_id": 1,
        "regimen_items": [{
          "id": 10,
          "regimen_id": 1,
          "time_offset": 173100000,
          "sequence": {
            "id": 2,
            "name": "Turn on LED.",
            "color": "blue",
            "steps": [{
              "id": 16,
              "message_type": "pin_write",
              "command": {},
              "sequence_id": 2,
              "position": 0
            }]
          }
        }, {
          "id": 11,
          "regimen_id": 1,
          "time_offset": 263160000,
          "sequence": {
            "id": 3,
            "name": "Turn Off LED.",
            "color": "pink",
            "steps": [{
              "id": 15,
              "message_type": "pin_write",
              "command": {},
              "sequence_id": 3,
              "position": 0
            }]
          }
        }, {
          "id": 12,
          "regimen_id": 1,
          "time_offset": 353220000,
          "sequence": {
            "id": 4,
            "name": "Turn On Vacuum",
            "color": "orange",
            "steps": [{
              "id": 12,
              "message_type": "pin_write",
              "command": {},
              "sequence_id": 4,
              "position": 0
            }]
          }
        }, {
          "id": 13,
          "regimen_id": 1,
          "time_offset": 443280000,
          "sequence": {
            "id": 5,
            "name": "Turn Off Vaccuum",
            "color": "green",
            "steps": []
          }
        }]
      }],
      "current": 0
    };

    let target: any = {
        "id": 11,
        "regimen_id": 1,
        "time_offset": 263160000,
        "sequence": {
            "id": 3,
            "name": "Turn Off LED.",
            "color": "pink",
            "steps": [{
                "id": 15,
                "message_type": "pin_write",
                "command": {},
                "sequence_id": 3,
                "position": 0
            }]
        }
    };
    let regimensBefore = before.all[before.current].regimen_items;
    let action = removeRegimenItem(target);
    let after  = reduce(before, action);
    let regimensAfter = after.all[after.current].regimen_items;
    expect(regimensBefore.length).toBeGreaterThan(regimensAfter.length);
    expect(findWhere(regimensAfter, action.payload)).toBeFalsy();
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
    let update = { color: "blue", name: "Something funny" };
    let result = reduce(initialState, editRegimen(regimen,
      update));
    let curReg = result.all[0];
    expect(curReg.color).toEqual(update.color);
    expect(curReg.name).toEqual(update.name);
  });

});
