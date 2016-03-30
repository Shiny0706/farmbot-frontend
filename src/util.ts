import * as _ from "lodash";
import * as $ from "jquery";

export function convertFormToObject(formEl) {
  let inputs = $(formEl.querySelectorAll("input"));
  let values = $.map(inputs, function(d) { return [[d.name, d.value]]; });
  return _.object(values);
}

// http://stackoverflow.com/a/901144/1064917
// Grab a query string param by name, because redux-simple-router doesn't
// support query strings yet.
export function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        r = regex.exec(location.search);
    return r === null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
}
