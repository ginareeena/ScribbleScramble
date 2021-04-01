import socketIOClient from "socket.io-client";

const socket = socketIOClient(window.location.origin, {
  withCredentials: true,
  // transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("FE: socket 'on connect' ->  connected to server!");
});

export default socket;
