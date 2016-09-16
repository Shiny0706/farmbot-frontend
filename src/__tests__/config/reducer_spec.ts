import { configReducer as reduce } from "../../config/reducer";
import { changeApiHost, changeApiPort } from "../../config/actions";
import { ConfigState } from "../../config/interfaces"

describe("Config reducer", function() {
  let initialState: ConfigState;
  beforeEach(() => {
    initialState = { host: "localhost", port: "8080" };
  });

  it("changes the port", () => {
    expect(initialState.port).not.toEqual("1234");
    let result = reduce(initialState, changeApiPort("1234"));
    expect(result.port).toEqual("1234");
    result = reduce(initialState, changeApiPort("x1y2z3q4"));
    expect(result.port).toEqual("1234");
  });

  it("changes the host", () => {
    expect(initialState.host).not.toEqual("1234");
    let result = reduce(initialState, changeApiHost("yahoo.com"));
    expect(result.host).toEqual("yahoo.com");
    result = reduce(initialState, changeApiHost("yahoo.com:3000"));
    expect(result.host).toEqual("yahoo.com");
    result = reduce(initialState, changeApiHost("http://bing.com"));
    expect(result.host).toEqual("bing.com");
    result = reduce(initialState, changeApiHost("altavista.com/"));
    expect(result.host).toEqual("altavista.com");
  });
});
