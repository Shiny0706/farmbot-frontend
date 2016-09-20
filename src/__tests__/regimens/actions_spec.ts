import { deleteRegimen, saveRegimen } from "../../regimens/actions";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";
import * as toast from "../../logger";
let moxios = require("moxios");
describe("Regimen actions", function () {
    let initialState: RegimensState;
    let regimen: Regimen;

    beforeEach(() => {
        moxios.install();
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

    it("deletes a Regimen", (done) => {
        let spy = jasmine.createSpy("delete_success");
        let thunk = deleteRegimen(regimen, "//altavista.com");
        let response = { id: 1, firstName: "Fred", lastName: "Flintstone" };
        spyOn(toast, "success");
        thunk(spy);
        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 200, response })
                    .then(function () {
                        // Expect the request to have been called with the regimen
                        expect(spy).toHaveBeenCalledWith(
                            { type: "DELETE_REGIMEN_OK",
                              payload: regimen });
                        expect(toast.success).toHaveBeenCalledWith("Regimen deleted.");
                        done();
                    });
            });
    });

    it("fails to delete a Regimen", (done) => {
        let spy = jasmine.createSpy("delete_fail");
        let thunk = deleteRegimen(regimen, "//altavista.com");
        spyOn(toast, "error");
        let response = { id: 1, firstName: "Fred", lastName: "Flintstone" };
        thunk(spy);
        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 404, response })
                    .then(function () {
                        expect(toast.error).toHaveBeenCalledWith("Unable to delete regimen.");
                        done();
                    });
            });
    });

    it("saves a Regimen", (done) => {
        let spy = jasmine.createSpy("save_success");
        let thunk = saveRegimen(regimen, "http://www.pmichaud.com/toast/");
        let response = { id: 1, firstName: "Fred", lastName: "Flintstone" };
        spyOn(toast, "success");
        thunk(spy);

        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 200, response })
                    .then(function () {
                        expect(toast.success).toHaveBeenCalledWith("Regimen saved.");
                        done();
                    });
            });
    });

    it("fails to save a Regimen", (done) => {
        let spy = jasmine.createSpy("save_fail");
        let thunk = saveRegimen(regimen, "http://toastytech.com/evil/");
        let response = { id: 1, firstName: "Fred", lastName: "Flintstone" };
        spyOn(toast, "error");
        thunk(spy);

        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 404, response })
                    .then(function () {
                        expect(toast.error).toHaveBeenCalledWith("Unable to save regimen.");
                        done();
                    });
            });
    });
});

