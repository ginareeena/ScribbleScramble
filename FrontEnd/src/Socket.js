import * as io from "socket.io-client";

const socket = io(window.location.origin, {
  withCredentials: true,
  // transports: ["websocket"]
  //^^TECHNICALLY NEEDED - currently throwing errors. don't delete. yet.
});

socket.on("connect", () => {
  console.log("FE: socket 'on connect' ->  connected to server!");
});

export default socket;
