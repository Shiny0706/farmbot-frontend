// Bootstrap.js doesn"t use ES6 modules yet. Need to globally export.
// Know a more ES6 compliant way to do this? Submit a PR!
import * as $ from "jquery";

// What you see below is one of the most glorious hacks to get a bootstrap
// plugin to play nice while simultaneously keeping typescript happy.
let qqq = $;
eval("window.$ = qqq; window.jQuery = $;");

// Programmatically add *.css and *.js from CDN to dom.
// If there"s a way to (easily) do this with WebPack, submit a PR!
export function loadFromCdn(filename, filetype) {
    let fileref;
    if (filetype === "js") { // if filename is a external JavaScript file
        fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype === "css") { // if filename is an external CSS file
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref !== "undefined") {
      document.getElementsByTagName("head")[0].appendChild(fileref);
    };
}

require("!style!css!sass!./css/toastr.scss");
require("!style!css!sass!./css/alerts.scss");
require("!style!css!sass!./css/auth.scss");
require("!style!css!sass!./css/blocks.scss");
require("!style!css!sass!./css/buttons.scss");
require("!style!css!sass!./css/events.scss");
require("!style!css!sass!./css/farm_designer.scss");
require("!style!css!sass!./css/farm_designer_mobile.scss");
require("!style!css!sass!./css/farmbot.scss");
require("!style!css!sass!./css/inputs.scss");
require("!style!css!sass!./css/farm_designer_panels.scss");
require("!style!css!sass!./css/map.scss");
require("!style!css!sass!./css/navbar.scss");
require("!style!css!sass!./css/search.scss");
require("!style!css!sass!./css/steps.scss");
require("!style!css!sass!./css/tables.scss");
require("!style!css!sass!./css/tooltips.scss");
require("!style!css!sass!./css/widgets.scss");
require("!style!css!sass!./css/widget_move.scss");
require("!style!css!sass!./css/widget_tool_control.scss");
require("!style!css!sass!./css/regimen_builder_mobile.scss");

loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
  "js");
