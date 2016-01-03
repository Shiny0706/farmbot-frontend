// SEE: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Constants
var CLOSED = 3;
var OPEN = 1;

function NullBot() {
  this.offline = offline
  this.socket = { readyState: CLOSED }
}

function offline() {
  return true;
}

export var bot = {};
bot.current = new NullBot();
bot.replace = function(newBot) {
  // Add aditional behavior to the bot.
  // TODO add this to Farmbot.js
  newBot.offline = function(){ return false } ;
  bot.current = newBot;
};
