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

export let colors: Array<Color> = ["blue", "green", "yellow", "orange", "purple", "pink", "gray", "red"];
/** Picks a color that is compliant with sequence / regimen color codes */
export function randomColor(): Color {
  return _.sample(colors);
}

export function defensiveClone<T>(target: T): T {
  let jsonString = JSON.stringify(target);
  return JSON.parse(jsonString);
}
