/// <reference path="../typings/index.d.ts"/>

import * as React from "react";
import { render } from "react-dom";
import { RootComponent }from "./root";
import { store } from "./store";
import { ready } from "./config/config_actions";

let node = document.createElement("DIV");
node.id = "root";

document.body.appendChild(node);

let reactElem = React.createElement(RootComponent, {store});
let domElem = document.getElementById("root");

if (domElem) {
  render(reactElem, domElem);
} else {
  throw new Error("Add a div with id `root` to the page first.");
};

document.addEventListener("DOMContentLoaded", function(event) {
  store.dispatch(ready(event));
});
