import * as _ from "lodash";
import * as $ from "jquery";
import * as Joi from "joi-browser";

export function convertFormToObject(formEl) {
  let inputs = $(formEl.querySelectorAll("input"));
  let values = $.map(inputs, function(d) { return [[d.name, d.value]]; });
  return _.object(values);
}

// http://stackoverflow.com/a/901144/1064917
// Grab a query string param by name, because react-router-redux doesn't
// support query strings yet.
export function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        r = regex.exec(location.search);
    return r === null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
}

/** Generate generic type guards that validate an interface against a Joi
    object schema. Returns a new type guard function. */
export function is<T>(schema: Joi.ObjectSchema) {
  return (input): input is T => !Joi.validate(input, schema).error;
}
