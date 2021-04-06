import io from "socket.io-client";

const socket = io(window.location.origin, {
  withCredentials: true,
});

socket.on("connect", () => {});

socket.on("invalid room", () => {
  alert("please enter valid room name");
});

export default socket;
