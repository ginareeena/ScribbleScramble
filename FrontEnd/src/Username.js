import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LandingPage } from "./AppCSS";
import socket from "./Socket";

const Username = () => {
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (hasUsername) {
      history.push("/");
    }
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username) {
      console.log("a new player has joined: ", username);
      setHasUsername(true);
      socket.emit("add new player", username);
    } else {
      alert("you didn't actually choose one tho...");
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Username;
