import { string, number, object } from "joi-browser";
import { is } from "../../util";
import { BotLog } from "./interfaces";

let botLogValidator = object().keys({
    data: string(),
    name: string(),
    priority: string(),
    time: number(),
    status: object().keys({
        x: number(),
        y: number(),
        z: number()
    })
});

export let isBotLog = is<BotLog>(botLogValidator);
