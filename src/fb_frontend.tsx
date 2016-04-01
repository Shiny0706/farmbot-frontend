/// <reference path="../typings/main.d.ts"/>

import * as React from "react";
import { render } from "react-dom";
import { RootComponent }from "./root";
import { store } from "./store";

let node = document.createElement("DIV");
node.id = "root";

document.body.appendChild(node);

var elem = React.createElement(RootComponent, {store});
render(elem, document.getElementById("root"));
