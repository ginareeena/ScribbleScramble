import { useState, useEffect } from "react";
import socket from "./Socket";
import { Title2 } from "./AppCSS";

const CurrentPlayers = () => {
  const [playerList, setPlayerList] = useState([]);
  useEffect(() => {
    socket.on("new player added", (allPlayers) => {
      console.log(
        `ON: new player added, received: ${JSON.stringify(allPlayers)}`
      );
      setPlayerList(allPlayers);
      console.log("updated playerList: ", playerList);
      return () => {
        socket.off("new player added");
      };
    });
  }, []);

  return (
    <div>
      <Title2>current players:</Title2>
      {/* <p>{playerList.map((player) => {})}</p> */}
    </div>
  );
};

export default CurrentPlayers;
