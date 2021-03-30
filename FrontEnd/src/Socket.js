import socketIOClient from "socket.io-client";
const SERVER = "http://127.0.0.1:4001";

const socket = socketIOClient(SERVER, {
  withCredentials: true
});

socket.on("connect", () => {
  console.log("i'm connected with the front end!");
});
export default socket;
