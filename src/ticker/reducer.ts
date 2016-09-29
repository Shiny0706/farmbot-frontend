import { generateReducer } from "../generate_reducer";
import { TickerState } from "./interfaces";
import { ReduxAction } from "../interfaces";
import { t } from "i18next";

let YELLOW = "#fd6",
    RED = "#e66",
    GREEN = "#6a4";

function change(color: string, message: string, show = true) {
    return (s: TickerState, a: ReduxAction<{}>) => ({ color, message, show });
}

export let tickerReducer = generateReducer<TickerState>({
    message: "Please log in",
    color: "gray",
    show: true
  })
.add<{}>("LOGIN_OK", change(YELLOW, t("Logged in")) )
.add<{}>("LOGIN_ERR", change(RED, t("Bad login")))
.add<{}>("FETCH_PLANTS_START", change(YELLOW, t("Fetching plants")))
.add<{}>("FETCH_PLANTS_OK", change(GREEN, t("Done fetching plants")))
.add<{}>("FETCH_PLANTS_ERR", change(RED, t("Error fetching plants")))
.add<{}>("FETCH_SEQUENCES_OK", change(GREEN, t("Done fetching sequences")))
.add<{}>("READ_STATUS_OK", change(GREEN, t("Bot status OK")))
.add<{}>("FETCH_DEVICE_ERR", change(RED, t("Can't connect to MQTT server")))
.add<{}>("READ_STATUS_ERR", change(RED, t("Can't connect to bot")))
.add<{}>("BOT_NOTIFICATION", change(GREEN, t("Message received")))
.add<{}>("COMMAND_OK", change(GREEN, t("Message delivered")));
