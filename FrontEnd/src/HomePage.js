import { useState } from "react";
import { LandingPage } from "./AppCSS";
import LandingPageComp from "./LandingPage";
import socket from "./Socket";

const Home = () => {
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username) {
      setHasUsername(true);
      socket.auth = { username };
      socket.connect();
    } else {
      alert("please choose a valid username");
    }
  };

  socket.on("connect", () => {
    players.forEach((player) => {});
  });
  socket.on("new player added", (players) => {
    players.forEach((player) => {
      player.self = player.userId === socket.id;
    });
    console.log(players);
  });

  socket.on("new player connected", (player) => {
    player.connected = true;
    setPlayers(players.push(player));
  });

  return (
    <div>
      {hasUsername ? (
        <LandingPageComp />
      ) : (
        <LandingPage>
          <form onSubmit={handleSubmit}>
            <h6>please choose a username</h6>
            <input
              type="text"
              name="username"
              onChange={(evt) => setUsername(evt.target.value.trim())}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </LandingPage>
      )}
    </div>
  );
};

export default Home;
