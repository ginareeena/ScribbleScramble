import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const SocketComp = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      console.log("data inside client from API: ", data);
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  //broadcast all lines
  // export function broadcastLines(callback) {
  //   socket.on("linesToState", callback);
  // }

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
};

export default SocketComp;
