import { Regimen } from "./interfaces";

let THIRTY_SIX_HOURS = 129600;

let firstItem: Regimen = {
  _id: null,
  name: "World's First Regimen",
  color: "red",
  items: [
    {
      sequence: {
        _id: "xyz",
        color: "red",
        name: "Stub sequence",
        steps: [
          {
            message_type: "home_all",
            position: 0,
            _id: "string",
            command: {}
          }
        ],
        dirty: false
      },
      timeOffset: THIRTY_SIX_HOURS
    },
    {
      sequence: {
        _id: "xyz",
        color: "red",
        name: "Another sequence",
        steps: [
          {
            message_type: "home_all",
            position: 0,
            _id: "string",
            command: {}
          }
        ],
        dirty: false
      },
      timeOffset: THIRTY_SIX_HOURS * 2
    },
  ]
};

let secondItem = _.clone(firstItem);
secondItem.name = "Second Item";
export let stubs: Regimen[] = [firstItem, secondItem];
