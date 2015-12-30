import Farmbot from 'farmbot';
var bot;

export function maybeConnectBot(store) {
  var botState = store.getState().bot;
  if(!bot && botState.uuid && botState.token) {
    bot = Farmbot({ uuid: botState.uuid, token: botState.token });
    bot.connect().then(() => console.log("CONNECTED"));
    bot.on("change", function(data){
      store.dispatch({type: "BOT_CHANGE", payload: data})
    });
  }
  return bot;
}
