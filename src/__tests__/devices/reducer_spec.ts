import { botReducer as reduce } from "../../devices/reducer";
import { } from "../../devices/actions";
import { BotState } from "../../devices/interfaces";

describe("Config reducer", function() {
  let initialState: BotState;
  beforeEach(() => {
      let status = { NOT_READY: "never connected to device",
                     CONNECTING: "initiating connection",
                     AWAITING_API: "downloading device credentials",
                     API_ERROR: "Unable to download device credentials",
                     AWAITING_WEBSOCKET: "calling FarmBot with credentials",
                     WEBSOCKET_ERR: "Error establishing socket connection",
                     CONNECTED: "Socket Connection Established",
                     READY: "Bot ready"
                    };

    initialState = { account: { id: 0, uuid: "loading...", name: "loading..." },
                     logQueueSize: 10,
                     logQueue: [],
                     status: status.NOT_READY,
                     stepSize: 1000,
                     hardware: {},
                     axisBuffer: {},
                     settingsBuffer: {}
                    };
  });
});
