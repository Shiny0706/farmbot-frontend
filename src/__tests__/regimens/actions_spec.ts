import { deleteRegimen } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";
let moxios = require("moxios");
describe("Regimen actions", function () {
    let initialState: RegimensState;
    let regimen: Regimen;
    moxios.install();
    beforeEach(() => {
        regimen = {
            id: 123,
            name: "Whatevs",
            color: "red",
            regimen_items: [],
            dirty: true
        };
        initialState = { all: [regimen], current: 0 };
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("Adds a new empty Regimen", (done) => {
        let spy = jasmine.createSpy("success");

        let thunk = deleteRegimen(regimen, "//altavista.com");
        let response = { id: 1, firstName: "Fred", lastName: "Flintstone" };
        let blah = thunk(spy);
        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 200, response })
                    .then(function () {
                        expect(spy).toHaveBeenCalledWith({});
                        done();
                    });
            });

    });
});

