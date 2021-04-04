import * as io from "socket.io-client";

const socket = io(window.location.origin, {
  withCredentials: true,
  // transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("FE: socket 'on connect' ->  connected to server!");
});

socket.on("invalid room", () => {
  alert("please enter a valid room name");
});

export default socket;
