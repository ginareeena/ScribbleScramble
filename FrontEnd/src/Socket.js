import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client"
import socket from "socket.io-client";

export const clientSocket = socket(window.location.origin);

clientSocket.on("connect", () => {
  console.log("client socket!");
});

// const ENDPOINT = "http://127.0.0.1:4001";

const SocketComp = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
};

export default SocketComp;
