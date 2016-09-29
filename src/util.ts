import * as _ from "lodash";
import * as $ from "jquery";
import * as Joi from "joi-browser";
import { Color } from "./interfaces";

export function convertFormToObject(formEl: Element) {
  let inputs = $(formEl.querySelectorAll("input"));
  let values = $.map(inputs, function (d) { return [[d.name, d.value]]; });
  return _.object(values);
}

// http://stackoverflow.com/a/901144/1064917
// Grab a query string param by name, because react-router-redux doesn't
// support query strings yet.
export function getParam(name: string): string {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    r = regex.exec(location.search);
  return r === null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
}

/** Generate generic type guards that validate an interface against a Joi
    object schema. Returns a new type guard function. */
export function is<T>(schema: Joi.ObjectSchema) {
  return (input: T | {}): input is T => !Joi.validate(input, schema).error;
}

export let colors: Array<Color> = [
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "gray",
  "red"
];

/** Picks a color that is compliant with sequence / regimen color codes */
export function randomColor(): Color {
  return _.sample(colors);
}

export function defensiveClone<T>(target: T): T {
  let jsonString = JSON.stringify(target);
  return JSON.parse(jsonString);
}

interface AxiosErrorResponse {
  response?: {
    data: {
      [reason: string]: string
    };
  }
};

/** Concats and capitalizes all of the error key/value
 *  pairs returned by the /api/xyz endpoint. */
export function prettyPrintApiErrors(err: AxiosErrorResponse) {
  return _.map(safelyFetchErrors(err),
               (v, k) => `${k} ${v}.`.toLowerCase())
  .map(str => _.capitalize(str)).join(" ");
}

/** */ 
function safelyFetchErrors(err: AxiosErrorResponse): {[key: string]: string} {
  // In case the interpreter gives us an oddball error message.
  if (err && err.response && err.response.data) {
    return err.response.data;
  } else {
    console.warn("DONT KNOW HOW TO HANDLE THIS ERROR MESSAGE.");
    console.dir(err);

    return { possible: "connectivity issues." };
  };
}
