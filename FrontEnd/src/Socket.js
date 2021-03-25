import socketIOClient from "socket.io-client";
const SERVER = "http://127.0.0.1:4001";

const socket = socketIOClient(SERVER);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// maybe this should be connection?
// index.js serverSocket is on "connection"
socket.on("connect", () => {
  console.log("i'm connected with the front end!");
});
export default socket;
