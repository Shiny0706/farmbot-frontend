import { CONFIG } from './config';

// var meshBluProto = {

//   send: function(type, data) {
//     var frame = JSON.stringify([type, data]);
//     console.dir;
//     this.socket.send(frame);
//   },

//   connect: function(url) {
//     var socket = new WebSocket(url);
//     ['onmessage', 'onclose', 'onopen']
//       .forEach((fn) => socket[fn] = this[fn])
//     return this;
//   },

//   onmessage: function(e) {
//     debugger;
//   },

//   onclose: function(e) {
//     debugger;
//   },

//   onopen: function(e) {
//     this.send("register", {name: "farmbot"})
//   }
// }

export function MeshBlu(meshURL) {
  return {};// Object
          // .create(meshBluProto)
          // .connect(meshURL || CONFIG.MESHBLU_URL);
}
