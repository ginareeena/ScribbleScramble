import socketIOClient from "socket.io-client";

// also might not be pointing to heroku's port -> might need to point this to heroku's port
// UUIDs to create rooms?
// sockets have ids on server side can use for room logic
// const SERVER = "http://127.0.0.1:80";
//TCP:80
// const SERVER = "http://localhost:80";
const SERVER = "TCP:80";

const socket = socketIOClient(SERVER);

socket.on("connect", () => {
  console.log("i'm connected with the front end!");
});
export default socket;
