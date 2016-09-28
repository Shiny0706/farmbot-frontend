import { saveSequence, deleteSequence, nullSequence } from "../../sequences/actions";
import { Sequence } from "../../sequences/interfaces";
import { SequenceReducerState } from "../../sequences/interfaces";
import { fakeState } from "../helpers";
import * as toast from "../../logger";
let moxios = require("moxios");

describe("Sequence actions", function () {
    let initialState: SequenceReducerState;
    let sequence: Sequence;
    beforeEach(() => {
        moxios.install();
        sequence = {color: "blue",
                    name: "beep",
                    steps: []};
        initialState = {all: [sequence, nullSequence()], current: 0};
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("saves a Sequence", (done) => {
        let spy = jasmine.createSpy("save_success");
        let newSequence = nullSequence();
        newSequence.name = "I LOVE SEQUENCES";
        let thunk = saveSequence(newSequence);
        let response = newSequence;
        spyOn(toast, "success");
        thunk(spy, fakeState);

        moxios
            .wait(() => {
                let request = moxios.requests.mostRecent();
                request
                    .respondWith({ status: 200, response })
                    .then(function () {
                        expect(toast.success).toHaveBeenCalled();
                        expect(toast.success).toHaveBeenCalledWith("Saved 'I LOVE SEQUENCES'");
                        done();
                    });
            });
    });
});

