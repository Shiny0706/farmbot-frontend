import { deleteRegimen } from "../../regimens/actions";
import { useFakeXMLHttpRequest } from "sinon";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";

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
    });

    it("Adds a new empty Regimen", () => {
        let fakeRequest = useFakeXMLHttpRequest();
        let requests: Sinon.SinonFakeXMLHttpRequest[] = [];
        fakeRequest.onCreate = function (xhr) {
            requests.push(xhr);
        };
        let thunk = deleteRegimen(regimen, "//altavista.com");
        let dispatchSpy = jasmine.createSpy("dispatcher Fn");
        thunk(dispatchSpy);
        let request = requests[0];
        request.respond(200, {}, "");
        expect(request.url).toEqual("//altavista.com/api/regimens/123")
        fakeRequest.restore();
    });
});
