import { BotLog } from "./interfaces";

const schema = {
    data: "string",
    name: "string",
    priority: "string",
    time: "number",
    status: "object",
};

export function isBotLog(log: BotLog|{}): log is BotLog {
   let results: { [key: string]: boolean; } = {};
   _.forIn(log, (v: any, k: string) => results[k] = (typeof v === (schema as any)[k]));
   return !_(results).values().includes(false);
};
