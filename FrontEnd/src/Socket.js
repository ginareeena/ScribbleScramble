import * as io from "socket.io-client";
import useHistory from "react-router-dom";

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



// export const disconnectSocket = () => {
//   console.log("disconnecting socket");
//   socket.disconnect();
// };

export default socket;
