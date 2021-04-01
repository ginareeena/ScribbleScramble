import socketIOClient from "socket.io-client";

const socket = socketIOClient(window.location.origin, {
  withCredentials: true,
  // transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("i'm connected with the front end!");
});
export default socket;
