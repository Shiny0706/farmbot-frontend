import * as Joi from "joi-browser";
import { is } from "../../util";
import { BotLog } from "./interfaces";

let str = Joi.string;
let botLogValidator = Joi.object().keys({ data: str(), name: str(), priority: str()});

export let isBotLog = is<BotLog>(botLogValidator);
