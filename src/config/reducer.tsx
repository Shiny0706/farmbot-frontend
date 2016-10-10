import { generateReducer } from "../generate_reducer";
import { ChangeApiHost, ChangeApiPort, ConfigState} from "./interfaces";

/** Remove any accidental http:// or https:// from host name. */
let stripUrl = (url: string) => url.replace(/(https|http|[0-9]|\:|\/|\/\/)/g, "") || "";

let initialState: ConfigState = {
  host: stripUrl(location.host),
  port: (location.host as any)["includes"] ("localhost") ? "3000" : (location.port || "80")
};

export let configReducer = generateReducer<ConfigState>(initialState)
  .add<ChangeApiPort>("CHANGE_API_PORT", function(s, a) {
    s.port = a.payload.port.replace(/\D/g, "");
    return s;
  })
  .add<ChangeApiHost>("CHANGE_API_HOST", function(s, a) {
    s.host = stripUrl(a.payload.host);
    return s;
  });
