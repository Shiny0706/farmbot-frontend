var devices;

function NullBot() {
  this.name = "Null bot"
}

devices = {
  current: new NullBot(),
  add: function(newBot) {
    // Add aditional behavior to the bot.
    // TODO add this to Farmbot.js
    newBot.offline = function(){ return false } ;
    bot.current = newBot;
  }
};

module.exports = devices
