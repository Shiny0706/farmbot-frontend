import Farmbot from 'farmbot';
var bot;

export function getBot() {
  return bot || botNotReady();
}

export function maybeConnectBot(store) {
  var botState = store.getState().bot;
  if(!bot && botState.uuid && botState.token) {
    bot = Farmbot({ uuid: botState.uuid, token: botState.token });
    bot
      .connect()
      .then(() => bot)
      .catch(() => console.warn("Couldnt connect to Farmbot socket"));
    bot.on("change", function(data){
      store.dispatch({type: "BOT_CHANGE", payload: data})
    });
  };
  return bot;
}
