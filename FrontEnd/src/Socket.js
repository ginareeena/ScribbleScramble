import socketIOClient from "socket.io-client";
const SERVER = "http://127.0.0.1:4001";

const socket = socketIOClient(SERVER, { autoConnect: false });

socket.on("connect", () => {
  console.log("FE: socket 'on connect' ->  connected to server!");
});

export default socket;
