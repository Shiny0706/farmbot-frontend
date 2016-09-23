// Bootstrap.js doesn"t use ES6 modules yet. Need to globally export.
// Know a more ES6 compliant way to do this? Submit a PR!
import * as _$ from "jquery";
declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;
// Lul
(window as any)["$"] = _$;
(window as any)["jQuery"] = _$;

// Programmatically add *.css and *.js from CDN to dom.
// If there"s a way to (easily) do this with WebPack, submit a PR!
export function loadFromCdn(filename: string, filetype: string): void {
    let fileref: Element;
    if (filetype === "js") { // if filename is a external JavaScript file
        fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    } else if (filetype === "css") { // if filename is an external CSS file
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

require("!style!css!sass!./css/index.scss");

// TODO: Put this into a bundle with file splitting (for caching / performance).
// As it stands, app will not look right in offline mode because of dependence
// on these URLs for CSS.
// TODO: Use webpack CDN loader instead of this mess.
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
  "js");
