import { deleteRegimen } from "../../regimens/actions";
import * as sinon from "sinon";
import { Regimen } from "../../regimens/interfaces";
import { RegimensState } from "../../regimens/interfaces";

describe("Regimen actions", function () {
    let initialState: RegimensState;
    let regimen: Regimen;
    let fakeRequest: Sinon.SinonFakeXMLHttpRequest;
    let requests: Sinon.SinonFakeXMLHttpRequest[] = [];


    beforeEach(() => {
        regimen = {
            id: 123,
            name: "Whatevs",
            color: "red",
            regimen_items: [],
            dirty: true
        };

        initialState = { all: [regimen], current: 0 };
        fakeRequest = sinon.useFakeXMLHttpRequest();

        fakeRequest.onCreate = function (xhr) {
            console.log("HELLO");
            requests.push(xhr);
        };
    });

    afterEach(() => {
        fakeRequest.restore();
    });

    it("Adds a new empty Regimen", () => {
        let thunk = deleteRegimen(regimen, "//altavista.com");
        thunk( sinon.spy() );
        let request = requests[0];
        request.respond(200, {}, "");
        expect(request.url).toEqual("//altavista.com/api/regimens/123")
    });
});
