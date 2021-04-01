import io from "socket.io-client";

const socket = io(window.location.origin, {
  withCredentials: true,
  // transports: ["websocket"]
  //^^TECHNICALLY NEEDED - currently throwing errors. don't delete. yet.
});

socket.on("connect", () => {
  console.log("FE: socket 'on connect' ->  connected to server!");
});

socket.on("private room", () => {
  console.log("front end: joining private room!");
  io.emit("joinPrivateRoom");
});

export default socket;
