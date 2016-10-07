import { Regimen } from "./interfaces";
import { duration } from "moment";

let THIRTY_SIX_HOURS = duration(36, "hours").asMilliseconds();

let firstItem: Regimen = {
    id: 123,
    name: "World's First Regimen",
    color: "red",
    regimen_items: [
        {
            sequence: {
                id: 456,
                color: "red",
                name: "Stub sequence",
                kind: "sequence",
                args: {},
                body: [],
                dirty: false
            },
            time_offset: THIRTY_SIX_HOURS
        },
    ]
};

let secondItem = _.clone(firstItem) as Regimen;
secondItem.name = "Second Item";
export let stubs: Regimen[] = [firstItem, secondItem];
