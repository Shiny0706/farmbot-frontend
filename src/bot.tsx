
function NullBot() {
  this.name = "Null bot"
}

export var devices = {
  current: new NullBot(),
  add: (newBot) => {
    // Add aditional behavior to the bot.
    // TODO add this to Farmbot.js
    newBot.offline = function(){ return false } ;
    this.current = newBot;
  }
};
