/// <reference path="../typings/main.d.ts"/>

import * as React from "react";
import { render } from "react-dom";
import { RootComponent }from "./root";
import { store } from "./store";
import { ready } from "./components/config/config_actions";

let node = document.createElement("DIV");
node.id = "root";

document.body.appendChild(node);

let elem = React.createElement(RootComponent, {store});
render(elem, document.getElementById("root"));
document.addEventListener("DOMContentLoaded", function(event) {
  store.dispatch(ready(event));
});
