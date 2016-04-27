import { store } from "./store";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
export let history = syncHistoryWithStore( browserHistory, store );
export let push = ( url ) => history.push( url );
