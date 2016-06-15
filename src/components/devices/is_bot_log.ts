import { string, number, object } from "joi-browser";
import { is } from "../../util";
import { BotLog } from "./interfaces";

let botLogValidator = object().keys({
    data: string(),
    name: string(),
    priority: string(),
    time: number()
});

export let isBotLog = is<BotLog>(botLogValidator);
