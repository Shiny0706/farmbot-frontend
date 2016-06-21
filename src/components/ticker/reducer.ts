import { generateReducer } from "../generate_reducer";
import { TickerState } from "./interfaces";

let YELLOW = "#fd6",
    RED = "#e66",
    GREEN = "#6a4";

function change(color: string, message: string, show = true) {
    return (s, a) => ({ color, message, show });
}

export let tickerReducer = generateReducer<TickerState>({
    message: "Please log in",
    color: "gray",
    show: true
  })
.add<{}>("LOGIN_OK", change(YELLOW, "Logged in"))
.add<{}>("LOGIN_ERR", change(RED, "Bad login"))
.add<{}>("FETCH_PLANTS_START", change(YELLOW, "Fetching plants"))
.add<{}>("FETCH_PLANTS_OK", change(YELLOW, "Done fetching plants"))
.add<{}>("FETCH_PLANTS_ERR", change(RED, "Plant fetch error"))
.add<{}>("FETCH_SEQUENCES_OK", change(GREEN, "Done fetching sequences"))
.add<{}>("READ_STATUS_OK", change(GREEN, "Bot status OK"))
.add<{}>("FETCH_DEVICE_ERR", change(RED, "Message server offline?"))
.add<{}>("READ_STATUS_ERR", change(RED, "Bot offline?"))
.add<{}>("BOT_NOTIFICATION", change(GREEN, "Bot OK"))
.add<{}>("COMMAND_OK", change(GREEN, "Sent message OK"));



