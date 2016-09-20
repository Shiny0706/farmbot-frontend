import { deleteRegimen } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";
require("jasmine-ajax");

describe("Regimen actions", function () {
    let initialState: RegimensState;
    let regimen: Regimen;

    beforeEach(() => {
        regimen = {
            id: 123,
            name: "Whatevs",
            color: "red",
            regimen_items: [],
            dirty: true
        };
        initialState = { all: [regimen], current: 0 };
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("Adds a new empty Regimen", () => {
        let doneFn = jasmine.createSpy("success");

        let thunk = deleteRegimen(regimen, "//altavista.com");

        let blah = thunk( function(){
            return {
                type: "DELETE_REGIMEN_OK",
                regimen
            };
        } );
        debugger;
    });
});
