/// <reference path="../typings/browser.d.ts" />
import * as React from "react";
import { render } from "react-dom";
import syncReduxAndRouter = require("redux-simple-router");
import RootComponent = require("./root");
import { store } from "./store";

let node = document.createElement("DIV");
node.id = "root";

document.body.appendChild(node);
alert("But it's ok!");
render(<RootComponent store={ store } />, document.getElementById("root"));
